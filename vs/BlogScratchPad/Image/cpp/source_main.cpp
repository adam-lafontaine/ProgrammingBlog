#define LEAK_CHECK

#if defined(_WIN32) && defined(LEAK_CHECK)
#include "../../util/win32_leak_check.h"
#endif

#include "../demos/post003/post003.hpp"


int main()
{
#if defined(_WIN32) && defined(_DEBUG) && defined(LEAK_CHECK)
    int dbgFlags = _CrtSetDbgFlag(_CRTDBG_REPORT_FLAG);
    dbgFlags |= _CRTDBG_CHECK_ALWAYS_DF;   // check block integrity
    dbgFlags |= _CRTDBG_DELAY_FREE_MEM_DF; // don't recycle memory
    dbgFlags |= _CRTDBG_LEAK_CHECK_DF;     // leak report on exit
    _CrtSetDbgFlag(dbgFlags);
#endif

    run();
}