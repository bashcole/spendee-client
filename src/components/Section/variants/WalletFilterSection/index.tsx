import React, {useState} from 'react';

import {useRouter} from "next/router";
import {useTranslations} from "next-intl";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {
    addYears,
    subYears,
    startOfYear,
    endOfYear,
    differenceInCalendarYears
} from 'date-fns';
import {DateRangePicker, DefinedRange} from 'react-date-range';
import {dateFormat} from "@utils/index";
import Button from "@components/UI/Button";
import {
    StyledBackdrop
} from "@components/UI/Dialog/style";
// @ts-ignore
import {enUS as enLocale, bg as bgLocale} from 'react-date-range/dist/locale';
// @ts-ignore
import {defaultStaticRanges, defaultInputRanges, createStaticRanges} from "react-date-range/dist/defaultRanges";
import {StyledIsDesktop, StyledIsMobile} from "@components/Section/variants/WalletFilterSection/style";

interface IProps {
    startDate: Date,
    setStartDate: any,
    endDate: Date,
    setEndDate: any
}

const cleanRanges = defaultStaticRanges.map((item: any) => {
    return {
        label: item.label,
        range: item.range,
    }
})

console.log(cleanRanges)

const extendedStaticRanges = [...cleanRanges, {
    label: 'This Year',
    range: () => ({
        startDate: startOfYear(new Date),
        endDate: endOfYear(new Date())
    }),
}, {
    label: 'Last Year',
    range: () => ({
        startDate: startOfYear(subYears(new Date, 1)),
        endDate: endOfYear(subYears(new Date, 1))
    }),
}, {
    label: 'All History',
    range: () => ({
        startDate: subYears(new Date, 200),
        endDate: addYears(new Date(), 200)
    }),
}]

// console.log(defaultStaticRanges)
const WalletFilterSection = ({startDate, setStartDate, endDate, setEndDate}: IProps) => {

    const router = useRouter()
    const t = useTranslations("Wallet");

    const StaticRangesTranslated = createStaticRanges(extendedStaticRanges.map(item => {
        return {...item, label: t(item.label)}
    }));
    // const inputRangesLabels = defaultInputRanges.map((item: any) => { return {...item, label: t(item.label)}});

    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(prevState => !prevState)
    }

    const [state, setState] = useState({
        selection: {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            key: 'selection'
        }
    });

    const handleSelection = (item: any) => {
        console.log(item)
        setState({...state, ...item})
        if (item) {
            if (item.selection.endDate !== item.selection.startDate) {
                setStartDate(item.selection.startDate)
                setEndDate(item.selection.endDate)
                setIsOpen(false)
            }
        }
    }

    const calendarYears = differenceInCalendarYears(new Date, startDate)

    return (
        <>
            <div style={{position: "relative", marginBottom: "1rem", marginTop: "1rem"}}>
                <div style={{display: "flex"}}>
                    <div style={{marginLeft: "auto"}}>
                        <Button onClick={handleClick} shadow={false}>
                            {
                                calendarYears > 100 ? t("All History") : `${dateFormat(startDate, router.locale)} - ${dateFormat(endDate, router.locale)}`
                            }
                        </Button>
                    </div>
                </div>
                <div style={{position: "relative"}}>
                    {isOpen && <>
                        <StyledBackdrop onClick={handleClick}/>
                        <div style={{
                            position: "absolute",
                            right: "0px",
                            top: "1rem",
                            zIndex: 9999,
                            borderRadius: "0.5rem",
                            overflow: "hidden"
                        }}>
                            <StyledIsDesktop>
                                <DefinedRange
                                    onChange={handleSelection}
                                    staticRanges={StaticRangesTranslated}
                                    inputRanges={[]}
                                    ranges={[state.selection]}
                                />
                            </StyledIsDesktop>
                            <StyledIsMobile>
                                <DateRangePicker
                                    locale={router.locale === "en" ? enLocale : bgLocale}
                                    onChange={handleSelection}
                                    months={1}
                                    direction="vertical"
                                    staticRanges={StaticRangesTranslated}
                                    inputRanges={[]}
                                    scroll={{enabled: true}}
                                    ranges={[state.selection]}
                                />
                            </StyledIsMobile>

                        </div>
                    </>}
                </div>
            </div>


        </>
    )
}

export default WalletFilterSection;