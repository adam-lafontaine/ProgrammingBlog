# No leaks allowed
## How to check for memory leaks


```cpp
void memory_leak()
{
    auto total_bytes = 100;

    auto p = malloc(total_bytes);
}
```


```cpp
void no_memory_leak()
{
    auto total_bytes = 100;

    auto p = malloc(total_bytes);

    free(p);
}
```



```cpp
#if defined(_WIN32) && defined(_DEBUG)
#define _CRT_DEBUG_MAP_ALLOC
#include <crtdbg.h>
#endif


int main()
{
#if defined(_WIN32) && defined(_DEBUG)
	int dbgFlags = _CrtSetDbgFlag(_CRTDBG_REPORT_FLAG);
	dbgFlags |= _CRTDBG_CHECK_ALWAYS_DF;   // check block integrity
	dbgFlags |= _CRTDBG_DELAY_FREE_MEM_DF; // don't recycle memory
	dbgFlags |= _CRTDBG_LEAK_CHECK_DF;     // leak report on exit
	_CrtSetDbgFlag(dbgFlags);
#endif

    memory_leak();
}
```


```cpp
#include <opencv2/core.hpp>

void memory_leak()
{
    cv::Mat img;

    img.release();
}
```