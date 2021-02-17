interface Image {
    medium: string,
    original: string
}

interface Links {
    self: { href: string }
}
export default interface Episode {
    id: number,
    url: string,
    name: string,
    season: number,
    number: number,
    type: string,
    airdate: string,
    airtime: string,
    airstamp: string,
    runtime: number,
    image: null | Image,
    summary: string,
    _links: Links
}

