const fs = require('fs/promises'); 
async function crearArchivo(indice) {
    const contenido = 'Hola, este es el contenido del archivo.'; 
    const ruta = `./miArchivo${indice}.txt`;  
    try {
        await fs.writeFile(ruta, contenido, 'utf-8');
    } catch (error) {
        console.error(`Error en archivo ${indice}:`, error);
    }
}
function crearMuchosArchivos(cantidad) { 
    for (let i = 1; i <= cantidad; i++) {
        crearArchivo(i);
    }
    console.log(`Se iniciaron ${cantidad} archivos`);
}

crearMuchosArchivos(5);