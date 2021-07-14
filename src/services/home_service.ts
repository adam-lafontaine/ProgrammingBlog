import { DataResult } from "../types"

export function echo_id(id: number): DataResult<any>
{
    const result = new DataResult<any>();

    if(id < 10)
    {
        result.message = "Id should be at least 10";
    }
    else
    {
        result.success = true;
        result.message = "Success";
        result.data = `Data for Id = ${id}`;
    }

    return result;
}


export function get_object_properties(obj: any): DataResult<string>
{
    const result = new DataResult<string>();

    const types = ["string", "number", "bigint", "boolean"];
    const get_type = (tp: string) => { return types.includes(tp) ? tp : "any"; };

    try
    {
        let data: string = "";
        for(const [key, value] of Object.entries(obj))
        {
            data += `${key}: ${get_type(typeof(value))};`;
        }

        result.success = true;
        result.message = "Success";
        result.data = data;
    }
    catch(error: unknown)
    {
        result.success = false;
        result.message = "Error"
    }

    return result;
}


export function  update_something(obj: any): DataResult<any>
{
    const result = new DataResult<any>();

    result.success = true;
    result.message = "Success";
    result.data = 42;

    return  result;
}