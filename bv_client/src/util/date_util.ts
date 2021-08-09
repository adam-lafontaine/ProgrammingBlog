

export module DateUtil
{
    export function to_date_string(post_id: string): string
    {
        const pattern = /^\d{13}$/;
        
        if(!post_id.match(pattern))
        {
            return "";
        }

        const options: any = { year: 'numeric', month: 'long', day: 'numeric' };

        return new Date(parseInt(post_id)).toLocaleDateString('en-US', options);
    }
}