export const defaultMenu = [
    {
        label: 'Home',
        icon: 'pi pi-home',
        url: '/'
    },
    {
        label: 'Features',
        icon: 'pi pi-star',
        url: '/pi'
    },
    {
        label: 'Contact',
        icon: 'pi pi-mobile',
        items: [
            {
                label: 'Location',
                icon: 'pi pi-location',
                items: [{ label: 'about us..', url: '/aboutUs' }]
            },
            {
                label: 'email',
                icon: 'pi pi-envelope',
                items: [{ label: 'send me an email' }]
            },
        ]
    },
];

export const handleWhatsAppShare = (text: string, url: string ) => {
    const message = encodeURIComponent(`${text} ${url}`);
    window.open(`https://wa.me/?text=${message}`, "_blank");
};