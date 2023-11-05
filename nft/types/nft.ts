
export type Trait= "Health" | "speed" | "attack"

export type NftAttribute ={
    trait_type : Trait,
    value : string
}

export type NftMeta ={
    description : string,
    name : string,
    image : string,
    attributes : NftAttribute
}