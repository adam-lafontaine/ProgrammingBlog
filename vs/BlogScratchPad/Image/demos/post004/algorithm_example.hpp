#pragma once

#include <vector>
#include <algorithm>
#include <numeric>
#include <random>
#include <execution>
#include <iostream>


#include "../../../util/stopwatch.hpp"


int do_work(int n)
{
    std::random_device r;
    std::default_random_engine eng(r());
    std::uniform_int_distribution<int> uniform_dist(10, 1000);

    int sum = 0;

    for (int i = 0; i < 100; ++i)
    {
        sum += uniform_dist(eng) % 3;
    }

    return sum;
}


void algorithm_example(size_t size)
{
    std::vector<int> vec(size);

    // { 1, 2, 3, 4, ... , size }
    std::iota(vec.begin(), vec.end(), 1);

    auto const times_two = [](int& n) { n *= 2; };

    // double each element
    std::for_each(vec.begin(), vec.end(), times_two);

    std::vector<int> dst(size);

    // apply the do_work function to each value and store the results in dst
    std::transform(vec.begin(), vec.end(), dst.begin(), do_work);
}


void algorithm_example_par(size_t size)
{
    std::vector<int> vec(size);

    // { 1, 2, 3, 4, ... , size }
    std::iota(vec.begin(), vec.end(), 1);

    auto const times_two = [](int& n) { n *= 2; };

    // double each element
    std::for_each(std::execution::par, vec.begin(), vec.end(), times_two);

    std::vector<int> dst(size);

    // apply the do_work function to each value and store the results in dst
    std::transform(std::execution::par, vec.begin(), vec.end(), dst.begin(), do_work);
}


void run()
{
    Stopwatch sw;

    auto const print_time = [&](const char* msg) { std::cout << msg << ": " << sw.get_time_milli() << "ms\n"; };

    size_t count = 100000;

    sw.start();

    algorithm_example(count);
    print_time("sequential");

    sw.start();
    algorithm_example_par(count);
    print_time("  parallel");
}