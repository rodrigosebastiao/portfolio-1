export default function embedded(url){
    const req = fetch(`/api/scrape?url=${url}`);
    // const HTMLString = await HTMLString.json();
    return {
        req: req
    };
    // https://api.whatsapp.com/send?1=pt_BR&phone=5511933572137
}