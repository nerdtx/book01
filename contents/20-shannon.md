\newpage

# Historical Figure - Claude Shannon

## The Father of Information Theory

In 1948, a young mathematician named **Claude Shannon** published a paper titled
*A Mathematical Theory of Communication*. That single paper laid the foundation
for nearly everything digital we use today - from smartphones to Wi-Fi, video
games to encryption.

But Shannon’s most lasting legacy in computing is this:
He proved that *all information* - whether it’s a photograph, a song, a
number, or a letter - can be represented using *only two symbols*:
`0` and `1`.

## Binary as Language

Before Shannon, most engineers assumed that telephones and computers would need
complex systems to carry complex information. Shannon’s genius was realizing
that *a simple on/off system*, used consistently and mathematically, could
represent anything.

That’s why modern computers store and process everything as **binary digits**,
or **bits**. It’s simple, fast, and reliable - even across noisy communication
lines.

## A Glimpse into His Mind

Claude Shannon once built a machine that solved a Rubik’s Cube, and another that
played the ukulele with robotic fingers. He loved juggling, chess, and
unicycles. He wasn’t just brilliant - he was playfully curious. The same kind of
mindset that helps great programmers thrive.

## A Measure of Entropy

One of my favorite concepts in Information Theory (and since I'm writing this
book and I get to choose what to write about) is Shannon's Theory of Entropy.

**Entropy** - a lack of predicatbility. If you measure entropy, you can begin to
quantify chaos.

Shannon's entropy is: `H = - Σ [p(x) * log2(p(x))]`

For a given string of characters, `p(x)` is the probability of that
character in the string.

### Example:

Let's say we have the string of characters `AAB`.

'A' appears 2 times, 'B' appears 1 time.

Therefore, the probability of `A` being in the string is 2 out of 3.
`p(A) = 2/3` The probability of `B` is 1 out of 3. `p(B) = 1/3`

It looks tricky but it's pretty straightforward.

Let's plug this in.

```
p(A) = 2/3
p(B) = 1/3
H = - [(2/3 * log2(2/3)) + (1/3 * log2(1/3))]
H = ~ 0.918
```

This calculation shows an approximate entropy of 0.918 bits per character.

From that we see we only need 1 bit to properly encode this message per
character.

Stick with me.

Now compare that to the string `ABC`.

```
p(A) = 1/3
p(B) = 1/3
p(C) = 1/3

H = - [(1/3 * log2(1/3)) + (1/3 * log2(1/3)) + (1/3 * log2(1/3))]
H = ~1.5
```

With `H=1.5` we need 2 bits to encode this message properly.

What's All This Mean?

Let's take a moment to ponder this. Intuitively, `ABB` is less random than
`ABC`. There's 2 different characters isntead of 3.  Three is more complicated
than two. It's more options to put a message together.

With `ABB`, there are only 2 possible characters in the entire message, because
one of them is repeated.

Now, what if we say `A` is a 0 and `B` is a 1.

Instead of sending `AAB`, we could just as easily send `001`.

If we were signaling with a flashlight, and each second meant a different bit
was transmitted, we could turn the light off for 2 seconds, then on 1 second.

Message sent.

```text
[off] [off] [on]
 0     0     1
 A     A     B
 ```

With `ABC`, we suddenly have a new problem.  We can't use 0 or 1, because what
about `C`?

Actually, it's no problem. What if we say `A` is `00` and `B` is `01` and `C` is
`11`?  We can use 2 bits for each character.

Suddenly we can still send our message with just 0's and 1's, but it's
now `00 01 11`.  With a flash  light, that's 6 seconds of off and on now.

```text
[off] [off] [off] [on] [on] [on]
 0     0     0     1    1    1
       A           B         C
```

So for a message of 3 characters, but with a larger alphabet of possible
characters, the same size (but more random message) requires much more thought
to send and receive.

**Entropy!**

> What other impacts of entropy or randomness can you think of?

Claude Shannon figured this out in the 1940s and it paved the way for computers
to function in the ways they still do today.


