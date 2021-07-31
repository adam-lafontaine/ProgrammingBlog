# Post from a file
## A little blurb about the post

This is the first paragraph of text

This is the second paragraph of text

```cpp
void for_each_pixel(image_t const& image, std::function<void(pixel_t& p)> const& func)
{
    u32 size = image.width * image.height;
    for (u32 i = 0; i < size; ++i)
    {
        func(image.data[i]); // do something
    }
}
```