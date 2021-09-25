#pragma once

#include <vector>
#include <algorithm>
#include <numeric>
#include <random>
#include <execution>
#include <iostream>


#include "../../../util/stopwatch.hpp"


template <typename T>
void sort(T& container)
{
    std::sort(container.begin(), container.end());
}


constexpr unsigned AMOUNT_OF_WORK = 100;


int do_work(int n)
{
    std::random_device r;
    std::default_random_engine eng(r());
    std::uniform_int_distribution<int> uniform_dist(10, 1000);

    int sum = 0;

    for (unsigned i = 0; i < AMOUNT_OF_WORK; ++i)
    {
        sum += uniform_dist(eng) % 3;
    }

    return sum;
}


void process_vector(std::vector<int>& src, std::vector<int>& dst)
{
    auto const times_two = [](int& n) { n *= 2; };

    // double each element in src
    std::for_each(src.begin(), src.end(), times_two);

    // apply the do_work function to each value of src and store the results in dst
    std::transform(src.begin(), src.end(), dst.begin(), do_work);
}


void process_vector_par(std::vector<int>& src, std::vector<int>& dst)
{
    auto const times_two = [](int& n) { n *= 2; };

    // double each element in src
    std::for_each(std::execution::par, src.begin(), src.end(), times_two);

    // apply the do_work function to each value of src and store the results in dst
    std::transform(std::execution::par, src.begin(), src.end(), dst.begin(), do_work);
}


constexpr unsigned ELEMENT_COUNT = 100000;


void run()
{
    Stopwatch sw;

    auto const print_time = [&](const char* msg) { std::cout << msg << ": " << sw.get_time_milli() << "ms\n"; };

    std::vector<int> src_vec(ELEMENT_COUNT);
    std::vector<int> dst_vec(ELEMENT_COUNT);

    // { 1, 2, 3, 4, ... , size }
    std::iota(src_vec.begin(), src_vec.end(), 1);

    std::cout << '\n';

    sw.start();
    process_vector(src_vec, dst_vec);
    print_time("sequential");

    // reset src_vec
    std::iota(src_vec.begin(), src_vec.end(), 1);

    sw.start();
    process_vector_par(src_vec, dst_vec);
    print_time("  parallel");
}