import React, {useState, useEffect} from "react"
import {useSelector} from "react-redux"

export default function SingleIdentification({identification}) {
    return (<div>{identification.id} {identification.taxon_id}</div>)
}
