#pragma once

#include "image.hpp"

inline void run()
{
	auto image_src_path = "out_files/pixel-character.png";

	Image image;
	read_image_from_file(image_src_path, image);

	Pixel blue = { 0, 35, 139, 255 };
	Pixel red = { 237, 41, 57, 255 };
	Pixel white = { 255, 255, 255, 255 };

	auto src_color = pixel_value(image, image.width / 2, image.height / 2);
	auto dst_color = blue;	

	auto const convert = [&](Pixel& p) 
	{
		if (p == src_color)
		{
			p = dst_color;
		}
		else if (p.alpha < 255)
		{
			p = white;
		}
	};

	for_each_pixel(image, convert);

	write_image(image, "out_files/pixel-character-blue.bmp");

	src_color = dst_color;
	dst_color = red;

	for_each_pixel(image, convert);

	write_image(image, "out_files/pixel_character-red.bmp");

	dispose_image(image);
}