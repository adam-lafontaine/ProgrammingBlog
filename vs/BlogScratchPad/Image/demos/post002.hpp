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


typedef struct
{
	u32 width;
	u32 height;

	u32* data;

} RGBAImage;


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
	//           r = 154  g = 188  b = 222  a = 255

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


void run()
{
	bitwise_example();
	rgba_pointer_cast_example();
	//rgb_pointer_cast_example();
	//bitwise_set_example();
	libimage_example();

	std::cout << "\n\n";
	int x = 0;
}