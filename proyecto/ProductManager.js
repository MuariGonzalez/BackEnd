const fs = require("fs").promises;

class ProductManager {

    static lastId = 0

    constructor(path) {
        this.products = [];
        this.path = path
    }

    async addProducts({ title, description, price, thumbnail, code, stock }) {


        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son abligatorios");
            return;
        }

        if (this.products.some(item => item.code === code)) {
            console.log("Cada code debe ser único");
            return;
        }
        const newPoduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ++ProductManager.lastId
        }

        if (arrayProductos.length > 0) {
            ProductManager.ultId = arrayProductos.reduce((maxId, product) => Math.max(maxId, product.id), 0);
        }

        this.products.push(newPoduct);

        await this.GuardarProducto(this.products)

    }

    async getProducts() {
        await this.LeerArchivo;
    }

    async getProductsById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);

            if (!buscado) {
                console.log("Producto no encontrado");
                return null;
            } else {
                console.log("Producto encontrado");
                return buscado;
            }
        } catch (error) {
            console.log("Error al leer el archivo", error);
            throw error;
        }
    }


    async LeerArchivo() {
        const respuesta = await fs.readFile(this.path, "utf-8");
        const arrayProducto = JSON.parse(respuesta);
        return arrayProducto;
    }

    async GuardarProducto(arrayProducto) {
        await fs.writeFile(this.path, JSON.stringify(arrayProducto, null, 2))

    }

    async updateProduct(id, productoActualizado) {
        try {
          const arrayProductos = await this.leerArchivo();
    
          const index = arrayProductos.findIndex(item => item.id === id);
    
          if (index !== -1) {
            arrayProductos[index] = { ...arrayProductos[index], ...productoActualizado };
            await this.guardarArchivo(arrayProductos);
            console.log("Producto actualizado");
          } else {
            console.log("No se encontró el producto");
          }
        } catch (error) {
          console.log("Error al actualizar el producto", error);
          throw error;
        }
      }

      async deleteProduct(id) {
        try {
          const arrayProductos = await this.leerArchivo();
    
          const index = arrayProductos.findIndex(item => item.id === id);
    
          if (index !== -1) {
            arrayProductos.splice(index, 1);
            await this.guardarArchivo(arrayProductos);
            console.log("Producto eliminado");
          } else {
            console.log("No se encontró el producto");
          }
        } catch (error) {
          console.log("Error al eliminar el producto", error);
          throw error;
        }
      }

}

const manager = new ProductManager();

manager.addProducts("jugo", "jugo en polvo", 50,"sin imagen",20,100);
manager.addProducts("dulce de leche", "repostero", 1000,"sin imagen",10,30);
manager.addProducts("arroz", "integral", 900,"sin imagen",30,10);
manager.addProducts("leche", "entera", 1500,"sin imagen",40,120);
manager.addProducts("jabon", "jabon liquido", 2050,"sin imagen",50,100);
manager.addProducts("pan", "rebanado", 1500,"sin imagen",60,90);
manager.addProducts("queso", "cremoso", 5000,"sin imagen",70,5);
manager.addProducts("detergente", "desengrasante", 3000,"sin imagen",80,50);
manager.addProducts("durazno", "enlatados", 4000,"sin imagen",90,99);
manager.addProducts("agua", "con gas", 150,"sin imagen",99,1000);
    
    
    module.exports = ProductManager;



