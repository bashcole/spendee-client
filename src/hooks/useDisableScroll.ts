import React, {useEffect, useState} from 'react';

const UseDisableScroll = () => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (active) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [active])

    return {
        disabled: active,
        disableScroll: () => setActive(true),
        allowScroll: () => setActive(false),
    }
}

export default UseDisableScroll;