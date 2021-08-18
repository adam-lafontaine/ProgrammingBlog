#pragma once

#include "../../util/libimage/libimage.hpp"
namespace img = libimage;

#include <cstdint>
#include <functional>
#include <cassert>

#include <iostream>

// make things easier to read
using u8 = uint8_t;    // 8 bit unsigned integer
using u32 = unsigned;  // 32 bit unsigned integer


//typedef struct
//{
//	u32 width;
//	u32 height;
//
//	u32* data;
//
//} RGBAImage;


void print(const char* str, u32 val)
{
	std::cout << str << val << '\n';
};


void bitwise_example()
{
	std::cout << "\nbitwise_example()\n\n";

	u32 color = 0x9ABCDEFF;

	// Decimal: 2596069119
	//     Hex:       9A       BC       DE       FF
	//  Binary: 10011010 10111100 11011110 11111111
	//           r = 154  g = 188  b = 222  a = 255 // wrong

	u8 r = color >> 24u;          // 00000000 00000000 00000000 10011010
	u8 g = (color >> 16u) & 255u; // 00000000 00000000 10011010 10111100 & 00000000 00000000 00000000 11111111
	u8 b = (color >> 8u) & 255u;  // 00000000 10011010 10111100 11011110 & 00000000 00000000 00000000 11111111
	u8 a = color & 255u;          // 10011010 10111100 11011110 11111111 & 00000000 00000000 00000000 11111111

	print("color: ", color);
	print("  red: ", r);
	print("green: ", g);
	print(" blue: ", b);
	print("alpha: ", a);
}


u8 get_green(u32 const p)
{
	return (p >> 16u) & 255u;
}


void set_green(u32& p, u8 green)
{
	auto r32 = p & 0xFF000000;
	auto g32 = (static_cast<u32>(green)) << 16;
	auto b32 = p & 0x0000FF00;
	auto a32 = p & 0x000000FF;

	p = r32 | g32 | b32 | a32;
}





typedef struct
{
	u8 red;
	u8 green;
	u8 blue;
	u8 alpha;

} RGBAPixelStruct;


void rgba_pointer_cast_example()
{
	std::cout << "\nrgba_pointer_cast_example()\n\n";

	using Pixel = RGBAPixelStruct; // 4 channel pixel

	print("  sizeof(u32): ", sizeof(u32));
	print("sizeof(Pixel): ", sizeof(Pixel));

	bool cast_wont_work = sizeof(u32) != sizeof(Pixel);

	if (cast_wont_work)
	{
		// both types must be the same size
		return;
	}

	u32 color = 2596069119;
	auto color_ptr = &color;

	auto pixel_ptr = (Pixel*)color_ptr;
	auto pixel = *pixel_ptr;

	print("color: ", color);
	print("  red: ", pixel.red);
	print("green: ", pixel.green);
	print(" blue: ", pixel.blue);
	print("alpha: ", pixel.alpha);
}


typedef struct
{
	u8 red;
	u8 green;
	u8 blue;

} RGBPixelStruct;


void rgb_pointer_cast_example()
{
	std::cout << "\nrgb_pointer_cast_example()\n\n";

	using Pixel = RGBPixelStruct; // 3 channel pixel

	print("  sizeof(u32): ", sizeof(u32));
	print("sizeof(Pixel): ", sizeof(Pixel));

	bool cast_wont_work = sizeof(u32) != sizeof(Pixel);
	if (cast_wont_work)
	{
		// both types must be the same size
		return;
	}

	u32 color = 2596069119;
	auto color_ptr = &color;

	auto pixel_ptr = (Pixel*)color_ptr;
	auto pixel = *pixel_ptr;

	print("color: ", color);
	print("  red: ", pixel.red);
	print("green: ", pixel.green);
	print(" blue: ", pixel.blue);
}


void bitwise_set_example()
{
	std::cout << "\nbitwise_set_example()\n\n";

	using Pixel = RGBAPixelStruct; // 4 channel pixel

	u32 color = 2596069119;

	set_green(color, 233);

	auto color_ptr = &color;

	auto pixel_ptr = (Pixel*)color_ptr;
	auto pixel = *pixel_ptr;

	print("color: ", color);
	print("  red: ", pixel.red);
	print("green: ", pixel.green);
	print(" blue: ", pixel.blue);
	print("alpha: ", pixel.alpha);
}


void libimage_example()
{
	std::cout << "\nlibimage_example()\n\n";

	using Pixel = img::pixel_t; // 4 channel pixel

	u32 color = 2596069119;

	set_green(color, 233);

	Pixel pixel;
	pixel.value = color;

	print("color: ", color);
	print("  red: ", pixel.red);
	print("green: ", pixel.green);
	print(" blue: ", pixel.blue);
	print("alpha: ", pixel.alpha);
}


typedef union
{
	u32 value;

	struct
	{
		u8 red;
		u8 green;
		u8 blue;
		u8 alpha;
	};

} RGBAPixelUnion;


typedef struct RGBAPixel_t
{
	u8 red   = 0;
	u8 green = 0;
	u8 blue  = 0;
	u8 alpha = 0;

} RGBAPixel;


typedef struct RGBAImage_t
{
	u32 width  = 0;
	u32 height = 0;

	RGBAPixel* data = nullptr;

} RGBAImage;


typedef struct RGBPixel_t
{
	u8 red   = 0;
	u8 green = 0;
	u8 blue  = 0;

} RGBPixel;


typedef struct RGBImage_t
{
	u32 width  = 0;
	u32 height = 0;

	RGBPixel* data = nullptr;

} RGBImage;


using Pixel = RGBAPixel;
using Image = RGBAImage;


void make_image(Image& image, u32 width, u32 height)
{
	assert(width);
	assert(height);

	image.width = width;
	image.height = height;
	image.data = (Pixel*)malloc(sizeof(Pixel) * width * height);

	assert(image.data);
}


void dispose_image(Image& image)
{
	if (image.data != nullptr)
	{
		free(image.data);
		image.data = nullptr;
	}
}


void for_each_pixel(Image const& image, std::function<void(Pixel& p)> const& func)
{
	for (size_t i = 0; i < image.width * image.height; ++i)
	{
		func(image.data[i]);
	}
}


void for_each_pixel(Image const& image, std::function<void(Pixel& p, u32 x, u32 y)> const& func)
{
	for (u32 y = 0; y < image.height; ++y)
	{
		auto row_offset = static_cast<size_t>(y * image.width);
		auto row_begin = image.data + row_offset;

		for (u32 x = 0; x < image.width; ++x)
		{
			func(row_begin[x], x, y);
		}
	}
}


Pixel pixel_value(Image const& image, u32 x, u32 y)
{
	auto row_offset = static_cast<size_t>(y * image.width);
	auto row_begin = image.data + row_offset;

	return row_begin[x];
}


void write_enlarged_image(Image const& rgba, const char* dst_path)
{
	u32 factor = 20;
	img::image_t big;
	img::make_image(big, rgba.width * factor, rgba.height * factor);

	auto const to_pixel = [](Pixel const& p) {};

	for (u32 y = 0; y < big.height; ++y)
	{
		auto my = y / factor;

		auto row_begin = big.row_begin(y);
		for (u32 x = 0; x < big.width; ++x)
		{
			auto mx = x / factor;
			auto const p = pixel_value(rgba, mx, my);
			row_begin[x] = img::to_pixel(p.red, p.green, p.blue);
		}
	}

	img::write_image(big, dst_path);
}


bool operator == (Pixel const& lhs, Pixel const& rhs)
{
	return
		lhs.red == rhs.red &&
		lhs.green == rhs.green &&
		lhs.blue == rhs.blue &&
		lhs.alpha == rhs.alpha;
}


void check_pixel(Pixel const& p, Pixel const& ex)
{
	auto const msg = p == ex ? "ok" : "not ok";
	printf_s("pixel: %2X %2X %2X %2X", p.red, p.green, p.blue, p.alpha);
	printf_s(", expected: %2X %2X %2X %2X", ex.red, ex.green, ex.blue, ex.alpha);
	printf_s(" - %s\n", msg);
}


void run()
{
	Pixel blue = { 0, 35, 139, 255 };
	Pixel white = { 255, 255, 255, 255 };
	Pixel red = { 237, 41, 57, 255 };
	Pixel black = { 0, 0, 0, 255 };
	Pixel gray = { 125, 125, 125, 255 };

	Image image;
	u32 image_width = 45;
	u32 image_height = 30;
	make_image(image, image_width, image_height);

	auto const french_flag = [&](Pixel& p, u32 x, u32 y) 
	{
		if (x < image_width / 3)          { p = blue; }
		else if (x < image_width * 2 / 3) { p = white; }
		else                              { p = red; }
	};

	for_each_pixel(image, french_flag);

	write_enlarged_image(image, "out_files/french.bmp");

	u32 blue_count = 0;
	auto const count = [&](Pixel& p) { blue_count += (p == blue); };

	for_each_pixel(image, count);

	std::cout << "\nblue pixel count = " << blue_count << '\n';	

	auto const pattern = [&](Pixel& p, u32 x, u32 y) 
	{
		if (x % 2 == 0 && y % 2 == 0)      { p = black; }
		else if (x % 2 != 0 && y % 2 != 0) { p = gray; }
		else                               { p = white; }
	};

	for_each_pixel(image, pattern);

	// check for black pixels (both even)
	check_pixel(pixel_value(image, 0, 0), black);
	check_pixel(pixel_value(image, 10, 6), black);

	// check for gray pixels (both odd)
	check_pixel(pixel_value(image, 5, 7), gray);
	check_pixel(pixel_value(image, 11, 1), gray);

	// check for white pixels (odd and even)
	check_pixel(pixel_value(image, 6, 3), white);
	check_pixel(pixel_value(image, 15, 8), white);

	write_enlarged_image(image, "out_files/pattern.bmp");

	dispose_image(image);

	std::cout << "\n\n";
	int x = 0;
}