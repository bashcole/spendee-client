import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const OverlayPortal = ({ children }: {children: any}) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        return () => setMounted(false)
    }, [])

    if(mounted){
        // @ts-ignore
        return createPortal(children, document.querySelector("#overlay"))
    }

    return null
}

export default OverlayPortal