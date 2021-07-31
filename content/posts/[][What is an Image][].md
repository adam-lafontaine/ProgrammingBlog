# What is an image?
## It's acually pretty easy

An image is simply a pointer with a height and width.

```cpp
// make things easier to read
using u8 = uint8_t;    // 8 bit unsigned integer
using u32 = unsigned;  // 32 bit unsigned integer


typedef struct
{
    u32 width;
    u32 height;
    u8* data;

} MonoImage
```

To create a new image...
```cpp
#include <cassert>

void make_image(MonoImage& image, u32 width, u32 height)
{
    assert(width);
    assert(height);

    image.width = width;
    image.height = height;
    image.data = (u8*)malloc(sizeof(u8) * width * height);

    assert(image.data);
}
```

When you are done with the image, clean up after yourself.
```cpp
void dispose_image(MonoImage& image)
{
    if(image.data)
    {
        free(image.data);
    }
}
```

Iterate over each pixel
```cpp
void process_pixel(u8& p)
{
    // do something with p
}

for(size_t i = 0; i < image.width * image.height; ++i)
{
    process_pixel(image.data[i]);
}
```

In more general terms...
```cpp
#include <functional>

void for_each_pixel(MonoImage& image, std::function<void(u8& p)> const& func)
{
    for(size_t i = 0; i < image.width * image.height; ++i)
    {
        func(image.data[i]);
    }
}
```

To process each pixel based on its x and y position
```cpp
void for_each_pixel(MonoImage& image, std::function<void(u8& p, u32 x, u32 y)> const& func)
{
    for(u32 y = 0; y < image.height; ++y)
    {
        auto row_offset = static_cast<size_t>(y * image.width);
        auto row_begin = image.data + row_offset;

        for(u32 x = 0; x < image.width; ++x)
        {
            auto& p = row_begin[x];
            func(p, x, y);
        }
    }
}
```

Putting it all together
```cpp
#include <cstdint>
#include <cassert>
#include <functional>

using u8 = uint8_t;
using u32 = unsigned;

typedef struct
{
    u32 width;
    u32 height;
    u8* data;

} MonoImage


void make_image(MonoImage& image, u32 width, u32 height)
{
    assert(width);
    assert(height);

    image.width = width;
    image.height = height;
    image.data = (u8*)malloc(sizeof(u8) * width * height);

    assert(image.data);
}


void dispose_image(MonoImage& image)
{
    if(image.data)
    {
        free(image.data);
    }
}


void for_each_pixel(MonoImage& image, std::function<void(u8& p)> const& func)
{
    for(size_t i = 0; i < image.width * image.height; ++i)
    {
        func(image.data[i]);
    }
}


void for_each_pixel(MonoImage& image, std::function<void(u8& p, u32 x, u32 y)> const& func)
{
    for(u32 y = 0; y < image.height; ++y)
    {
        auto row_offset = static_cast<size_t>(y * image.width);
        auto row_begin = image.data + row_offset;

        for(u32 x = 0; x < image.width; ++x)
        {
            auto& p = row_begin[x];
            func(p, x, y);
        }
    }
}


int main()
{
    MonoImage image;
    u32 image_width = 1600;
    u32 image_height = 900;

    make_image(image, image_width, image_height);

    // set the pixel to white
    auto const set_as_white = [](u8& p){ p = 255; };

    for_each_pixel(image, set_as_white);

    // set the pixel to black if x and y are both even
    auto const black_if_even = [](u8& p, u32 x, u32 y)
    {
        if(x % 2 == 0 && y % 2 == 0)
        {
            p = 0;
        }
    };

    for_each_pixel(image, black_if_even);

    dispose_image(image);
}

```