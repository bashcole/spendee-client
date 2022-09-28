export const walletNavigation = (id: string, type: string | undefined) => {
    return [
        {
            name: type === 'cash' ? 'Transactions' : 'Positions',
            url: `/wallet/${id}`,
            active: true
        },
        {
            name: 'Overview',
            url: `/wallet/${id}/overview`,
        },
        {
            name: 'Wallet Settings',
            url: `/wallet/${id}/settings`
        }
    ]
}

export const walletOverviewNavigation = (id: string) => {
    return [
        {
            name: 'Transactions',
            url: `/wallet/${id}`,
        },
        {
            name: 'Overview',
            url: `/wallet/${id}/overview`,
            active: true
        },
        {
            name: 'Wallet Settings',
            url: `/wallet/${id}/settings`,
        }
    ]
}

export const walletSettingsNavigation = (id: string) => {
    return [
        {
            name: 'Transactions',
            url: `/wallet/${id}`,
        },
        {
            name: 'Overview',
            url: `/wallet/${id}/overview`,
        },
        {
            name: 'Wallet Settings',
            url: `/wallet/${id}/settings`,
            active: true
        }
    ]
}