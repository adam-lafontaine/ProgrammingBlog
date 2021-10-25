#define LEAK_CHECK

#if defined(_WIN32) && defined(LEAK_CHECK)
#include "../../util/win32_leak_check.h"
#endif
#include <corecrt_malloc.h>

//#include "../demos/post004/algorithm_example.hpp"

void memory_leak()
{
    auto total_bytes = 100;

    auto p = malloc(total_bytes);
}


void no_memory_leak()
{
    auto total_bytes = 100;

    auto p = malloc(total_bytes);

    free(p);
}


int main()
{
#if defined(_WIN32) && defined(_DEBUG) && defined(LEAK_CHECK)
    int dbgFlags = _CrtSetDbgFlag(_CRTDBG_REPORT_FLAG);
    dbgFlags |= _CRTDBG_CHECK_ALWAYS_DF;   // check block integrity
    dbgFlags |= _CRTDBG_DELAY_FREE_MEM_DF; // don't recycle memory
    dbgFlags |= _CRTDBG_LEAK_CHECK_DF;     // leak report on exit
    _CrtSetDbgFlag(dbgFlags);
#endif

    memory_leak();
}