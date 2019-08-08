---
title: 理解Java的字符串，String、StringBufer、StringBuilder
tags:
  - 随笔
categories:
  - Java
date: 2019-04-10 19:59:43
updated: 2019-04-10 19:59:43
---

# 理解Java的字符串，String、StringBufer、StringBuilder有什么区别？

## 典型回答

String 是 Java 语言非常基础和重要的类，提供了构造和管理字符串的各种基本逻辑。它是典型的 Immutable 类，被声明成为 fnal class ，所有属性也都是 fnal 的。也由于它的不可 变性，类似拼接、裁剪字符串等动作，都会产生新的 String 对象。由于字符串操作的普遍性，所以相关操作的效率往往对应用性能有明显影响。

StringBufer 是为解决上面提到拼接产生太多中间对象的问题而提供的一个类，我们可以用 append 或者 add 方法，把字符串添加到已有序列的末尾或者指定位置。 StringBufer 本 质是一个线程安全的可修改字符序列，它保证了线程安全，也随之带来了额外的性能开销，所以除非有线程安全的需要，不然还是推荐使用它的后继者，也就是 StringBuilder 。

StringBuilder 是 Java 1.5 中新增的，在能力上和 StringBufer 没有本质区别，但是它去掉了线程安全的部分，有效减小了开销，是绝大部分情况下进行字符串拼接的首选。

## 考点分析

- 通过String和相关类，考察基本的线程安全设计与实现，各种基础编程实践。

- 考察JVM对象缓存机制的理解以及如何良好地使用。

- 考察JVM优化Java代码的一些技巧。

- String相关类的演进，比如Java 9中实现的巨大变化。

## 知识扩展

### 字符串设计和实现考量

String 是 Immutable 类的典型实现，原生的保证了基础线程安全，因为你无法对它内部数据进行任何修改，这种便利甚至体现在拷贝构造函数中，由于不可 变， Immutable 对象在拷贝时不需要额外复制数据。

我们再来看看 StringBufer 实现的一些细节，它的线程安全是通过把各种修改数据的方法都加上 synchronized 关键字实现的，非常直白。其实，这种简单粗暴的实现方式，非常适 合我们常见的线程安全类实现，不必纠结于 synchronized 性能之类的，有人说 “ 过早优化是万恶之源 ” ，考虑可靠性、正确性和代码可读性才是大多数应用开发最重要的因素。

为了实现修改字符序列的目的， StringBufer 和 StringBuilder 底层都是利用可修改的（ char ， JDK 9 以后是 byte ）数组，二者都继承了 AbstractStringBuilder ，里面包含了基本 操作，区别仅在于最终的方法是否加了 synchronized 。

另外，这个内部数组应该创建成多大的呢？如果太小，拼接的时候可能要重新创建足够大的数组；如果太大，又会浪费空间。目前的实现是，构建时初始字符串长度加 16 （这意味 着，如果没有构建对象时输入最初的字符串，那么初始值就是 16 ）。我们如果确定拼接会发生非常多次，而且大概是可预计的，那么就可以指定合适的大小，避免很多次扩容的开 销。扩容会产生多重开销，因为要抛弃原有数组，创建新的（可以简单认为是倍数）数组，还要进行 arraycopy 。

在没有线程安全问题的情况下，全部拼接操作是应该都用 StringBuider 实现吗？毕竟这样书写的代码，还是要多敲很多字的，可读性也不理想，下面的对比非常明显。

```java
String srByBuilder = new StringBuilder().append("aa").append("bb").append("cc").append ("dd").toString();

String srByConcat = "aa" + "bb" + "cc" + "dd";
```

其实，在通常情况下，没有必要过于担心，要相信 Java 还是非常智能的。 我们来做个实验，把下面一段代码，利用不同版本的 JDK 编译，然后再反编译，例如：

```java
public class StringConcat {

public satic void main(String[] args) { 
  String myStr = "aa" + "bb" + "cc" + "dd"; 
  Sysem.out.println("My String:" + myStr); 
  }
}
```

先编译再反编译，比如使用 JDK 9 ：

```java
${JAVA9_HOME}/bin/javac StringConcat.java
${JAVA9_HOME}/bin/javap -v StringConcat.class
```

JDK 8 的输出片段是：
```java
6: new #4 // class java/lang/StringBuilder
9: dup  
10: invokespecial #5  // Method java/lang/StringBuilder."<init>":()V 
13: ldc #6  // String My String:
15: invokevirtual #7  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
18: aload_1 
19: invokevirtual #7  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder; 
22: invokevirtual #8  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
```
而在 JDK 9 中，反编译的结果就非常简单了，片段是：
```java
7: invokedynamic #4, 0  // InvokeDynamic #0:makeConcatWithConsants:(Ljava/lang/String;)Ljava/lang/String;
```

你可以看到，在 JDK 8 中，字符串拼接操作会自动被 javac 转换为 StringBuilder 操作，而在 JDK 9 里面则是因为 Java 9 为了更加统一字符串操作优化，提供 了 StringConcatFactory ，作为一个统一的入口。 javac 自动生成的代码，虽然未必是最优化的，但普通场景也足够了，你可以酌情选择。

### 字符串缓存

我们粗略统计过，把常见应用进行堆转储（ Dump Heap ），然后分析对象组成，会发现平均 25% 的对象是字符串，并且其中约半数是重复的。如果能避免创建重复字符串，可以有 效降低内存消耗和对象创建开销。

String 在 Java 6 以后提供了 intern() 方法，目的是提示 JVM 把相应字符串缓存起来，以备重复使用。在我们创建字符串对象并调用 intern() 方法的时候，如果已经有缓存的字符串， 就会返回缓存里的实例，否则将其缓存起来。一般来说， JVM 会将所有的类似 “abc” 这样的文本字符串，或者字符串常量之类缓存起来。

看起来很不错是吧？但实际情况估计会让你大跌眼镜。一般使用 Java 6 这种历史版本，并不推荐大量使用 intern ，为什么呢？魔鬼存在于细节中，被缓存的字符串是存在所 谓 PermGen 里的，也就是臭名昭著的 “ 永久代 ” ，这个空间是很有限的，也基本不会被 FullGC 之外的垃圾收集照顾到。所以，如果使用不当， OOM 就会光顾。

在后续版本中，这个缓存被放置在堆中，这样就极大避免了永久代占满的问题，甚至永久代在 JDK 8 中被 MetaSpace （元数据区）替代了。而且，默认缓存大小也在不断地扩大中， 从最初的 1009 ，到 7u40 以后被修改为 60013 。你可以使用下面的参数直接打印具体数字，可以拿自己的 JDK 立刻试验一下。

```java
-XX:+PrintStringTableStatisics
```

你也可以使用下面的JVM参数手动调整大小，但是绝大部分情况下并不需要调整，除非你确定它的大小已经影响了操作效率。

```java
-XX:StringTableSize=N
```

Intern是一种 显式地排重机制 ，但是它也有一定的副作用，因为需要开发者写代码时明确调用，一是不方便，每一个都显式调用是非常麻烦的；另外就是我们很难保证效率，应用开 发阶段很难清楚地预计字符串的重复情况，有人认为这是一种污染代码的实践。

幸好在 Oracle JDK 8u20 之后，推出了一个新的特性，也就是 G1 GC 下的字符串排重。它是通过将相同数据的字符串指向同一份数据来做到的，是 JVM 底层的改变，并不需 要 Java 类库做什么修改。

注意这个功能目前是默认关闭的，你需要使用下面参数开启，并且记得指定使用 G1 GC ：

```java
-XX:+UseStringDeduplication
```

前面说到的几个方面，只是 Java 底层对字符串各种优化的一角，在运行时，字符串的一些基础操作会直接利用 JVM 内部的 Intrinsic 机制，往往运行的就是特殊优化的本地代码，而根 本就不是 Java 代码生成的字节码。 Intrinsic 可以简单理解为，是一种利用 native 方式 hard-coded 的逻辑，算是一种特别的内联，很多优化还是需要直接使用特定的 CPU 指令，具体 可以看相关 源码 ，搜索“string”以查找相关Intrinsic定义。当然，你也可以在启动实验应用时，使用下面参数，了解intrinsic发生的状态。

```java
-XX:+PrintCompilation -XX:+UnlockDiagnosicVMOptions -XX:+PrintInlining //样例输出片段 
180 3 3 java.lang.String::charAt (25 bytes) 
  @ 1 java.lang.String::isLatin1 (19 bytes) 
  ...

  @ 7 java.lang.StringUTF16::getChar (60 bytes) intrinsic
```

可以看出，仅仅是字符串一个实现，就需要 Java 平台工程师和科学家付出如此大且默默无闻的努力，我们得到的很多便利都是来源于此。 我会在专栏后面的 JVM 和性能等主题，详细介绍 JVM 内部优化的一些方法，如果你有兴趣可以再深入学习。即使你不做 JVM 开发或者暂时还没有使用到特别的性能优化，这些知识也 能帮助你增加技术深度。

### String 自身的演化

如果你仔细观察过 Java 的字符串，在历史版本中，它是使用 char 数组来存数据的，这样非常直接。但是 Java 中的 char 是两个 bytes 大小，拉丁语系语言的字符，根本就不需要太宽 的 char ，这样无区别的实现就造成了一定的浪费。密度是编程语言平台永恒的话题，因为归根结底绝大部分任务是要来操作数据的。 

其实在 Java 6 的时候， Oracle JDK 就提供了压缩字符串的特性，但是这个特性的实现并不是开源的，而且在实践中也暴露出了一些问题，所以在最新的 JDK 版本中已经将它移除 了。

在 Java 9 中，我们引入了 Compact Strings 的设计，对字符串进行了大刀阔斧的改进。将数据存储方式从 char 数组，改变为一个 byte 数组加上一个标识编码的所谓 coder ，并且将 相关字符串操作类都进行了修改。另外，所有相关的 Intrinsic 之类也都进行了重写，以保证没有任何性能损失。

虽然底层实现发生了这么大的改变，但是 Java 字符串的行为并没有任何大的变化，所以这个特性对于绝大部分应用来说是透明的，绝大部分情况不需要修改已有代码。

当然，在极端情况下，字符串也出现了一些能力退化，比如最大字符串的大小。你可以思考下，原来 char 数组的实现，字符串的最大长度就是数组本身的长度限制，但是替换 成 byte 数组，同样数组长度下，存储能力是退化了一倍的！还好这是存在于理论中的极限，还没有发现现实应用受此影响。

在通用的性能测试和产品实验中，我们能非常明显地看到紧凑字符串带来的优势， 即更小的内存占用、更快的操作速度 。

## 扩展
### String
(1) String的创建机理 

由于String在Java世界中使用过于频繁， Java为了避免在一个系统中产生大量的String对象， 引入了字符串常量池。其运行机制是：创建一个字符串时，首先检查池中是否有值相同的字符串对 象，如果有则不需要创建直接从池中刚查找到的对象引用；如果没有则新建字符串对象，返回对象引用，并且将新创建的对象放入池中。但是，通过new方法创建的String对象是不检查字符串 池的，而是直接在堆区或栈区创建一个新的对象，也不会把对象放入池中。上述原则只适用于通过直接量给String对象引用赋值的情况。

举例：
```java
String str1 = "123"; //通过直接量赋值方式， 放入字符串常量池 
String str2 = new String(“123”);//通过new方式赋值方式， 不放入字符串常量池
```
> 注意：String提供了intern()方法。调用该方法时，如果常量池中包括了一个等于此String对象的字符串（由equals方法确定），则返回池中的字符串。否则，将此String对象添加到池中，并且 返回此池中对象的引用。


(2) String的特性 

- [A] 不可变。 是指String对象一旦生成，则不能再对它进行改变。不可变的主要作用在于当一个对象需要被多线程共享，并且访问频繁时，可以省略同步和锁等待的时间，从而大幅度提高系统 性能。不可变模式是一个可以提高多线程程序的性能，降低多线程程序复杂度的设计模式。

- [B] 针对常量池的优化。 当2个String对象拥有相同的值时，他们只引用常量池中的同一个拷贝。当同一个字符串反复出现时，这个技术可以大幅度节省内存空间。

### StringBufer/StringBuilder

StringBufer和StringBuilder都实现了AbstractStringBuilder抽象类， 拥有几乎一致对外提供的调用接口；其底层在内存中的存储方式与String相同，都是以一个有序的字符序列（char类型 的数组）进行存储，不同点是StringBufer/StringBuilder对象的值是可以改变的，并且值改变以后，对象引用不会发生改变;两者对象在构造过程中，首先按照默认大小申请一个字符数组，由 于会不断加入新数据，当超过默认大小后，会创建一个更大的数组，并将原先的数组内容复制过来，再丢弃旧的数组。因此，对于较大对象的扩容会涉及大量的内存复制操作，如果能够预先评 估大小，可提升性能。

唯一需要注意的是：StringBufer是线程安全的，但是StringBuilder是线程不安全的。可参看Java标准类库的源代码， StringBufer类中方法定义前面都会有synchronize关键字。 为 此， StringBufer的性能要远低于StringBuilder。

### 应用场景

- [A]在字符串内容不经常发生变化的业务场景优先使用String类。 例如：常量声明、少量的字符串拼接操作等。如果有大量的字符串内容拼接，避免使用String与String之间的“+”操作，因为这 样会产生大量无用的中间对象，耗费空间且执行效率低下（新建对象、回收对象花费大量时间）。

- [B]在频繁进行字符串的运算（如拼接、替换、删除等）， 并且运行在多线程环境下，建议使用StringBufer，例如XML解析、HTTP参数解析与封装。

- [C]在频繁进行字符串的运算（如拼接、替换、删除等）， 并且运行在单线程环境下，建议使用StringBuilder，例如SQL语句拼装、JSON封装等。


































