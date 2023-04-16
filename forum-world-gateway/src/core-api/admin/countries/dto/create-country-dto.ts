export class CreateCountryDto {
    constructor(
        readonly name: String, 
        readonly pathFragment: String,
        readonly flagImageUrl: String) { }
}