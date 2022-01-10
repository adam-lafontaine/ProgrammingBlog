#include "simd.hpp"
#include "../../../util/stopwatch.hpp"

#include <immintrin.h>
#include <xmmintrin.h>
#include <cstdio>
#include <cmath>


using r32 = float;
using r64 = double;


void add_4_wide(r32* arr_a, r32* arr_b, r32* arr_dst, size_t N)
{
	__m128 wa; // 128 bits wide, holds 4 32 bit floats
	__m128 wb;
	__m128 wdst;

	// loop over the arrays, 4 elements at a time
	for (size_t i = 0; i < N; i += 4)
	{
		// get starting pointers for the current 4 elements
		auto a = arr_a + i;
		auto b = arr_b + i;
		auto dst = arr_dst + i;

		// load values from arr_a and arr_b into the registers
		wa = _mm_load_ps(a);
		wb = _mm_load_ps(b);

		// add the values in a and b together
		wdst = _mm_add_ps(wa, wb);

		// store the results at this location in arr_dst
		_mm_store_ps(dst, wdst);
	}
}


void multiply_1_wide(r32* arr_a, r32* arr_b, r32* arr_dst, size_t N)
{
	for (size_t i = 0; i < N; ++i)
	{
		arr_dst[i] = arr_a[i] * arr_b[i];
	}
}


void multiply_4_wide(r32* arr_a, r32* arr_b, r32* arr_dst, size_t N)
{
	__m128 wa;
	__m128 wb;
	__m128 wdst;

	for (size_t i = 0; i < N; i += 4)
	{
		auto a = arr_a + i;
		auto b = arr_b + i;
		auto dst = arr_dst + i;

		wa = _mm_load_ps(a);
		wb = _mm_load_ps(b);

		wdst = _mm_mul_ps(wa, wb);

		_mm_store_ps(dst, wdst);
	}
}


void multiply_8_wide(r32* arr_a, r32* arr_b, r32* arr_dst, size_t N)
{
	__m256 wa;
	__m256 wb;
	__m256 wdst;

	for (size_t i = 0; i < N; i += 8)
	{
		auto a = arr_a + i;
		auto b = arr_b + i;
		auto dst = arr_dst + i;

		wa = _mm256_load_ps(a);
		wb = _mm256_load_ps(b);

		wdst = _mm256_mul_ps(wa, wb);

		_mm256_store_ps(dst, wdst);
	}
}


void fill_array(r32* arr, r32 val, size_t N)
{
	for (size_t i = 0; i < N; ++i)
	{
		arr[i] = val;
	}
}


void multiply()
{
	printf("\nMultiply\n");

	Stopwatch sw;
	r64 time_ms = 0.0;

	size_t const N = 80'000'000;

	auto arr_a = (r32*)malloc(N * sizeof(r32));
	auto arr_b = (r32*)malloc(N * sizeof(r32));
	auto arr_dst = (r32*)malloc(N * sizeof(r32));

	fill_array(arr_a, 3.0f, N);
	fill_array(arr_b, 2.0f, N);
	fill_array(arr_dst, 0.0f, N);

	auto const report_and_reset = [&](int width)
	{
		time_ms = sw.get_time_milli();
		printf("%d wide time: %f\n", width, time_ms);

		for (size_t i = 0; i < N; ++i)
		{
			if (arr_dst[i] != 6.0f)
			{
				printf("!!! multiply error !!!\n");
				break;
			}
		}

		fill_array(arr_dst, 0.0f, N);
	};

	sw.start();

	multiply_1_wide(arr_a, arr_b, arr_dst, N);

	report_and_reset(1);

	sw.start();

	multiply_4_wide(arr_a, arr_b, arr_dst, N);

	report_and_reset(4);

	sw.start();

	multiply_8_wide(arr_a, arr_b, arr_dst, N);

	report_and_reset(8);

	free(arr_a);
	free(arr_b);
	free(arr_dst);
}


void fmadd_1_wide(r32* arr_a, r32* arr_b, r32* arr_c, r32* arr_dst, size_t N)
{
	for (size_t i = 0; i < N; ++i)
	{
		arr_dst[i] = arr_a[i] * arr_b[i] + arr_c[i];
	}
}


void fmadd_4_wide(r32* arr_a, r32* arr_b, r32* arr_c, r32* arr_dst, size_t N)
{
	__m128 wa;
	__m128 wb;
	__m128 wc;
	__m128 wdst;

	for (size_t i = 0; i < N; i += 4)
	{
		auto a = arr_a + i;
		auto b = arr_b + i;
		auto c = arr_c + i;
		auto dst = arr_dst + i;

		wa = _mm_load_ps(a);
		wb = _mm_load_ps(b);
		wc = _mm_load_ps(c);

		wdst = _mm_fmadd_ps(wa, wb, wc);

		_mm_store_ps(dst, wdst);
	}
}


void fmadd_8_wide(r32* arr_a, r32* arr_b, r32* arr_c, r32* arr_dst, size_t N)
{
	__m256 wa;
	__m256 wb;
	__m256 wc;
	__m256 wdst;

	for (size_t i = 0; i < N; i += 8)
	{
		auto a = arr_a + i;
		auto b = arr_b + i;
		auto c = arr_c + i;
		auto dst = arr_dst + i;

		wa = _mm256_load_ps(a);
		wb = _mm256_load_ps(b);
		wc = _mm256_load_ps(c);

		wdst = _mm256_fmadd_ps(wa, wb, wc);

		_mm256_store_ps(dst, wdst);
	}
}


void fused_multiply_add()
{
	printf("\nFused Multiply-Add\n");

	Stopwatch sw;
	r64 time_ms = 0.0;

	size_t const N = 80'000'000;

	auto arr_a = (r32*)malloc(N * sizeof(r32));
	auto arr_b = (r32*)malloc(N * sizeof(r32));
	auto arr_c = (r32*)malloc(N * sizeof(r32));
	auto arr_dst = (r32*)malloc(N * sizeof(r32));

	fill_array(arr_a, 3.0f, N);
	fill_array(arr_b, 2.0f, N);
	fill_array(arr_c, 1.0f, N);
	fill_array(arr_dst, 0.0f, N);

	auto const report_and_reset = [&](int width)
	{
		time_ms = sw.get_time_milli();
		printf("%d wide time: %f\n", width, time_ms);

		for (size_t i = 0; i < N; ++i)
		{
			if (arr_dst[i] != 7.0f)
			{
				printf("!!! fmadd error !!!\n");
				break;
			}
		}

		fill_array(arr_dst, 0.0f, N);
	};

	sw.start();

	fmadd_1_wide(arr_a, arr_b, arr_c, arr_dst, N);

	report_and_reset(1);

	sw.start();

	fmadd_4_wide(arr_a, arr_b, arr_c, arr_dst, N);

	report_and_reset(4);

	sw.start();

	fmadd_8_wide(arr_a, arr_b, arr_c, arr_dst, N);

	report_and_reset(8);

	free(arr_a);
	free(arr_b);
	free(arr_c);
	free(arr_dst);
}


void hypot_1_wide(r32* arr_a, r32* arr_b, r32* arr_c, r32* arr_dst, size_t N)
{
	for (size_t i = 0; i < N; ++i)
	{
		auto asq = arr_a[i] * arr_a[i];
		auto bsq = arr_b[i] * arr_b[i];
		auto csq = arr_c[i] * arr_c[i];

		arr_dst[i] = sqrtf(asq + bsq + csq);
	}
}


void hypot_4_wide(r32* arr_a, r32* arr_b, r32* arr_c, r32* arr_dst, size_t N)
{
	__m128 wa;
	__m128 wb;
	__m128 wc;
	__m128 wdst;

	for (size_t i = 0; i < N; i += 4)
	{
		auto a = arr_a + i;
		auto b = arr_b + i;
		auto c = arr_c + i;
		auto dst = arr_dst + i;

		wa = _mm_load_ps(a);
		wb = _mm_load_ps(b);
		wc = _mm_load_ps(c);

		wa = _mm_mul_ps(wa, wa);
		wb = _mm_mul_ps(wb, wb);
		wc = _mm_mul_ps(wc, wc);

		wdst = _mm_sqrt_ps(_mm_add_ps(_mm_add_ps(wa, wb), wc));

		_mm_store_ps(dst, wdst);
	}
}


void hypot_8_wide(r32* arr_a, r32* arr_b, r32* arr_c, r32* arr_dst, size_t N)
{
	__m256 wa;
	__m256 wb;
	__m256 wc;
	__m256 wdst;

	for (size_t i = 0; i < N; i += 8)
	{
		auto a = arr_a + i;
		auto b = arr_b + i;
		auto c = arr_c + i;
		auto dst = arr_dst + i;

		wa = _mm256_load_ps(a);
		wb = _mm256_load_ps(b);
		wc = _mm256_load_ps(c);

		wa = _mm256_mul_ps(wa, wa);
		wb = _mm256_mul_ps(wb, wb);
		wc = _mm256_mul_ps(wc, wc);

		wdst = _mm256_sqrt_ps(_mm256_add_ps(_mm256_add_ps(wa, wb), wc));

		_mm256_store_ps(dst, wdst);
	}
}


void hypotenuse_3d()
{
	printf("\nHypotenuse 3D\n");

	Stopwatch sw;
	r64 time_ms = 0.0;

	size_t const N = 80'000'000;

	auto arr_a = (r32*)malloc(N * sizeof(r32));
	auto arr_b = (r32*)malloc(N * sizeof(r32));
	auto arr_c = (r32*)malloc(N * sizeof(r32));
	auto arr_dst = (r32*)malloc(N * sizeof(r32));

	fill_array(arr_a, 3.0f, N);
	fill_array(arr_b, 2.0f, N);
	fill_array(arr_c, 1.0f, N);
	fill_array(arr_dst, 0.0f, N);

	auto const report_and_reset = [&](int width)
	{
		time_ms = sw.get_time_milli();
		printf("%d wide time: %f\n", width, time_ms);

		for (size_t i = 0; i < N; ++i)
		{
			if (fabs(arr_dst[i] * arr_dst[i] - 14.0f) > 0.00001f)
			{
				printf("!!! hypotenuse error !!!\n");
				break;
			}
		}

		fill_array(arr_dst, 0.0f, N);
	};

	sw.start();

	hypot_1_wide(arr_a, arr_b, arr_c, arr_dst, N);

	report_and_reset(1);

	sw.start();

	hypot_4_wide(arr_a, arr_b, arr_c, arr_dst, N);

	report_and_reset(4);

	sw.start();

	hypot_8_wide(arr_a, arr_b, arr_c, arr_dst, N);

	report_and_reset(8);

	free(arr_a);
	free(arr_b);
	free(arr_c);
	free(arr_dst);
}


class MultiplyAdd
{
public:
	r32 a = 2.0f;
	r32 b = 3.0f;
	r32 c = 1.0f;
	r32 dst = 0.0f;
};


void madd_array_of_structs()
{
	printf("\nFused Multiply-Add Array of Structs\n");

	Stopwatch sw;
	r64 time_ms = 0.0;

	size_t const N = 80'000'000;

	auto struct_array = (MultiplyAdd*)malloc(N * sizeof(MultiplyAdd));
	if (!struct_array)
	{
		return;
	}

	sw.start();
	for (size_t i = 0; i < N; ++i)
	{
		struct_array[i].dst = struct_array[i].a* struct_array[i].b + struct_array[i].c;
	}

	time_ms = sw.get_time_milli();
	printf("array of structs time: %f\n", time_ms);

	free(struct_array);
}


class MultplyAddSOA
{
public:
	r32* arr_a;
	r32* arr_b;
	r32* arr_c;
	r32* arr_dst;
};


void madd_struct_of_arrays()
{
	printf("\nFused Multiply-Add Struct of Arrays\n");

	Stopwatch sw;
	r64 time_ms = 0.0;

	size_t const N = 80'000'000;

	MultplyAddSOA fmadd_soa;
	fmadd_soa.arr_a = (r32*)malloc(N * sizeof(r32));
	fmadd_soa.arr_b = (r32*)malloc(N * sizeof(r32));
	fmadd_soa.arr_c = (r32*)malloc(N * sizeof(r32));
	fmadd_soa.arr_dst = (r32*)malloc(N * sizeof(r32));

	fill_array(fmadd_soa.arr_a, 3.0f, N);
	fill_array(fmadd_soa.arr_b, 2.0f, N);
	fill_array(fmadd_soa.arr_c, 1.0f, N);
	fill_array(fmadd_soa.arr_dst, 0.0f, N);

	sw.start();
	for (size_t i = 0; i < N; ++i)
	{
		fmadd_soa.arr_dst[i] = fmadd_soa.arr_a[i] * fmadd_soa.arr_b[i] + fmadd_soa.arr_c[i];
	}

	time_ms = sw.get_time_milli();
	printf("struct of arrays time: %f\n", time_ms);

	free(fmadd_soa.arr_a);
	free(fmadd_soa.arr_b);
	free(fmadd_soa.arr_c);
	free(fmadd_soa.arr_dst);
}




void print_build_mode()
{
#ifdef _DEBUG

	printf("\nDebug Build\n");

#else

	printf("\nRelease Build /O2\n");

#endif // _DEBUG

}


void run()
{
	print_build_mode();

	printf("\nSIMD\n");

	multiply();
	fused_multiply_add();
	hypotenuse_3d();

	printf("\n\nSOA\n");

	fmadd_array_of_structs();
	fmadd_struct_of_arrays();
}