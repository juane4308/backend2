import {promise} from "node:dns"
import fs from "node:fs"

class productManager {
    constructor(path){
        this.path = path

        this.product = {}
        this.productsList = []
    }

    async setNewId(){
        const now = await new Date();
        return now.getTime();
    } 


    async getProduct(id){
        const list = await fs.promises.readFile(this.path, "utf-8")
        this.productsList = [...JSON.parse(list).products]
        this.productsList.map((prod, i)=>{
            if (prod.id == id) {
                this.product = prod
            }
        })
        return {...this.product}
    }
    async getAllProducts(){
        const list = await fs.promises.readFile(this.path, "utf-8")
        this.productsList = [...JSON.parse(list).products]
        return [...this.productsList]
    }
    async addProduct(product){
        const newId = await this.setNewId()
        await this.getAllProducts();
        let newProduct = {
            "id": newId,
        }
    }
}