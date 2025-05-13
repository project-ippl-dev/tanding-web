export interface AddressProvince {
    id: number
    name: string
}

export interface AddressCity {
    id: number
    name: string
    id_province: number
}