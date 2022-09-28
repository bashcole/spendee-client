import React from 'react';
import {motion} from "framer-motion";
import {variants} from "@constants/motion-variants";

const MotionWrap = (props: any) => {
    return (
        <motion.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{duration: 0.4, type: 'easeInOut'}}
            style={{position: 'relative'}}
        >
            {props.children}
        </motion.div>
    )
}

export default MotionWrap;