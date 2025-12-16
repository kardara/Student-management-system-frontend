import React from 'react'

export default function ({ headers, data }) {
    if (!data || !headers)
        return

    // console.log(data[0]);

    const objecKey = Object.getOwnPropertyNames(data[0]);
    return (
        <table className=''>
            <thead>
                <tr>
                    {headers.map((e, ind) => (<th key={ind} className=''>{e}</th>))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, ind) => (
                    <tr key={ind}>{
                        objecKey.map((key, i) => (<td key={i} className=''>{row[key]}</td>))
                    }</tr>))}
            </tbody>
        </table>
    )
}
