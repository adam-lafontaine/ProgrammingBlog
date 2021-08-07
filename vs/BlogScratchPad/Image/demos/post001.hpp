#pragma once

#include "../../util/libimage/libimage.hpp"
namespace img = libimage;


#include <cstdint>
#include <cassert>
#include <functional>
#include <iostream>

using u8 = uint8_t;
using u32 = unsigned;

typedef struct
{
    u32 width;
    u32 height;
    u8* data;

} MonoImage;


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
    if (image.data != nullptr)
    {
        free(image.data);
        image.data = nullptr;
    }
}


void for_each_pixel(MonoImage const& image, std::function<void(u8& p)> const& func)
{
    for (size_t i = 0; i < image.width * image.height; ++i)
    {
        func(image.data[i]);
    }
}


void for_each_pixel(MonoImage const& image, std::function<void(u8& p, u32 x, u32 y)> const& func)
{
    for (u32 y = 0; y < image.height; ++y)
    {
        auto row_offset = static_cast<size_t>(y * image.width);
        auto row_begin = image.data + row_offset;

        for (u32 x = 0; x < image.width; ++x)
        {
            auto& p = row_begin[x];
            func(p, x, y);
        }
    }
}


u8 pixel_value(MonoImage const& image, u32 x, u32 y)
{
    auto row_offset = static_cast<size_t>(y * image.width);
    auto row_begin = image.data + row_offset;

    return row_begin[x];
}


void write_example_image(MonoImage const& mimage)
{
    u32 factor = 20;
    img::gray::image_t big;
    img::make_image(big, mimage.width * factor, mimage.height * factor);

    for (u32 y = 0; y < big.height; ++y)
    {
        auto my = y / factor;

        auto row_begin = big.row_begin(y);
        for (u32 x = 0; x < big.width; ++x)
        {
            auto mx = x / factor;
            row_begin[x] = pixel_value(mimage, mx, my);
        }
    }

    img::write_image(big, "out_files/example.bmp");
}


void run()
{
    // sets a pixel to white
    auto const set_white = [](u8& p) { p = 255; };

    // set the pixel to black if x and y are both even
    auto const black_if_even = [](u8& p, u32 x, u32 y)
    {
        if (x % 2 == 0 && y % 2 == 0) { p = 0; }
    };

    // set the pixel to gray if x and y are both odd
    auto const gray_if_odd = [](u8& p, u32 x, u32 y)
    {
        if (x % 2 != 0 && y % 2 != 0) { p = 125; }
    };

    // print to console whether a pixel is what we think it should be
    auto const check_pixel = [](u8 p, u8 expected_value)
    {
        auto const msg = p == expected_value ? "ok" : "not ok";
        std::cout << "pixel: " << u32(p) << ", expected: " << u32(expected_value) << " - " << msg << "\n";
    };


    MonoImage image;
    u32 image_width = 16;
    u32 image_height = 9;

    make_image(image, image_width, image_height);

    // set all pixels to white
    for_each_pixel(image, set_white);
    check_pixel(pixel_value(image, 0, 0), 255);
    check_pixel(pixel_value(image, 3, 3), 255);
    check_pixel(pixel_value(image, 15, 8), 255);

    // set even x and y pixels to black
    for_each_pixel(image, black_if_even);

    // set odd x and y pixels to gray
    for_each_pixel(image, gray_if_odd);

    // check for black pixels (both even)
    check_pixel(pixel_value(image, 0, 0), 0);
    check_pixel(pixel_value(image, 10, 6), 0);

    // check for gray pixels (both odd)
    check_pixel(pixel_value(image, 5, 7), 125);
    check_pixel(pixel_value(image, 11, 1), 125);

    // check for white pixels (odd and even)
    check_pixel(pixel_value(image, 6, 3), 255);
    check_pixel(pixel_value(image, 15, 8), 255);

    write_example_image(image);

    //dispose_image(image);
}