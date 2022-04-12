#pragma once

#include <cstdint>
#include <cstdlib>
#include <algorithm>


using u32 = uint32_t;
using u8 = uint8_t;

using GrayPixel = u8;


class GrayImage
{
public:
    u32 width = 0;
    u32 height = 0;

    u8* data = nullptr;

    u8* begin() { return data; }
    u8* end() { return data + (size_t)width * (size_t)height; }

    u8* begin() const { return data; }
    u8* end() const { return data + (size_t)width * (size_t)height; }


    GrayImage() {};


    GrayImage(u32 w, u32 h)
    {
        auto const bytes = w * h * sizeof(u8);
        auto ptr = (u8*)malloc(bytes);
        if (ptr)
        {
            data = ptr;
            width = width;
            height = height;
        }
    }


    ~GrayImage()
    {
        if (data)
        {
            free(data);
            data = nullptr;
        }
    }
};


class Range2Du32
{
public:
    u32 x_begin;
    u32 x_end;
    u32 y_begin;
    u32 y_end;
};


class GrayView
{
public:

    GrayView(GrayImage const& image, Range2Du32 const& range);
};


void read_image_from_file(const char* img_path_src, GrayImage& image_dst);


void write_image(GrayImage const& image_src, const char* file_path_dst);


void invert_gray(GrayView const& view);


void run()
{
    // get an image from file
    GrayImage image;
    read_image_from_file("image path", image);
    auto const width = image.width;
    auto const height = image.height;

    // generate a view of the center region of the image
    Range2Du32 range{};
    range.x_begin = width / 4;
    range.x_end = width * 3 / 4;
    range.y_begin = height / 4;
    range.y_end = height * 3 / 4;

    GrayView view(image, range);

    // invert the grayscale colors of the pixels within the view
    invert_gray(view);

    // write the modified image to file
    write_image(image, "new image path");


}