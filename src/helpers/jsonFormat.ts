export const jsonFormat = (json:string) => {
    const cases = [
        {value:"{", replace:"{\n  "},
        {value:"}", replace:"\n}"},
        {value:",", replace:",\n  "},
    ]
    cases.forEach( ({value, replace}:any) => {
        json = json.replaceAll(value, replace)
    } )
    return json
}