const tamCelula=7;
const tamMatriz=100;

class AutomataCelular{
    
    constructor(dimension,ctx,celdas){
        this.dimension = dimension;
        this.ctx = ctx;
        this.celdas = celdas?celdas : [];
    }

    crear(){
        for (let x = 0; x < this.dimension; x++) {
            let row = [];
            for (let y = 0; y < this.dimension; y++) {
                const alive = Math.random()<0.5;
                row.push(alive);
            }
            this.celdas.push(row);
        }
    }

    seguiente(){
        this.pintar();
        this.evaluar();
    }


    pintar(){
        
        this.ctx.clearRect(0,0,this.dimension,this.dimension);
        
        for (let x = 0; x < this.dimension; x++) {
            for (let y = 0; y < this.dimension; y++) {
                if(this.celdas[x][y])
                    this.ctx.fillStyle="white";
                    //this.ctx.fillStyle="rgb("+Math.random()*255+","+Math.random()*255+",255)";
                    //this.ctx.fillStyle="rgb(255,"+Math.random()*240+",50)";
                else 
                    this.ctx.fillStyle="black";
                    
                this.ctx.fillRect(x*tamCelula,y*tamCelula,tamCelula,tamCelula);
            }
        }
    }

    evaluar(){

        let celdasAux = new Array(tamMatriz).fill("").map(()=>new Array(tamMatriz).fill(false)) ;
        
        for (let x = 0; x < this.dimension; x++) {
            for (let y = 0; y < this.dimension; y++) {
                let vecinosVivos=0;
                //1
                /*
                x o o
                o + o
                o o o
                */
                if(x>0 && y>0)
                    if(this.celdas[x-1][y-1])
                        vecinosVivos++;

                //2
                /*
                o o o
                x + o
                o o o
                */
                if(y>0)
                    if(this.celdas[x][y-1])
                        vecinosVivos++;
                
                //3
                /*
                o o o
                o + o
                x o o
                */
                if(x<(this.dimension-1) && y>0)
                    if(this.celdas[x+1][y-1])
                        vecinosVivos++;
                   
                //4
                /*
                o x o
                o + o
                o o o
                */
                if(x>0)
                    if(this.celdas[x-1][y])
                        vecinosVivos++;
                
                //5
                /*
                o o o
                o + o
                o x o
                */
                if(x < (this.dimension-1))
                    if(this.celdas[x+1][y])
                        vecinosVivos++;
                
                //6
                /*
                o o x
                o + o
                o o o
                */
                if(x>0 && y < (this.dimension-1))
                    if(this.celdas[x-1][y+1])
                        vecinosVivos++;      
                //7
                /*
                o o o
                o + x
                o o o
                */
                if( y < (this.dimension-1))
                    if(this.celdas[x][y+1])
                        vecinosVivos++;
                
                //8
                /*
                o o o
                o + o
                o o x
                */
                if( x < (this.dimension-1) && y < (this.dimension-1))
                    if(this.celdas[x+1][y+1])
                        vecinosVivos++;
                
                
                if(this.celdas[x][y])
                    celdasAux[x][y] = vecinosVivos==2||vecinosVivos==3;
                else
                    celdasAux[x][y] = vecinosVivos==3;
            }
        }
        this.celdas=celdasAux;
    }
}

const celdas= new Array(tamMatriz).fill("").map(()=>new Array(tamMatriz).fill(false)) ;
/*
//Cañón de planeadores de Gosper
celdas[0][4] = true;
celdas[0][5] = true;
celdas[1][4] = true;
celdas[1][5] = true;
celdas[10][4] = true;
celdas[10][5] = true;
celdas[10][6] = true;
celdas[11][3] = true;
celdas[11][7] = true;
celdas[12][2] = true;
celdas[12][8] = true;
celdas[13][2] = true;
celdas[13][8] = true;
celdas[14][5] = true;
celdas[15][3] = true;
celdas[15][7] = true;
celdas[16][4] = true;
celdas[16][5] = true;
celdas[16][6] = true;
celdas[17][5] = true;
celdas[20][2] = true;
celdas[20][3] = true;
celdas[20][4] = true;
celdas[21][2] = true;
celdas[21][3] = true;
celdas[21][4] = true;
celdas[22][1] = true;
celdas[22][5] = true;
celdas[24][0] = true;//0 bien //1 termina en ciclo
celdas[24][1] = true;
celdas[24][5] = true;
celdas[24][6] = true;
celdas[34][2] = true;
celdas[34][3] = true;
celdas[35][2] = true;
celdas[35][3] = true;
*/
/*
celdas[3][1] = true;
celdas[4][2] = true;
celdas[1][3] = true;
celdas[3][3] = true;
celdas[5][3] = true;
celdas[2][4] = true;
celdas[3][5] = true;
*/
/*
celdas[3][3] = true;
celdas[4][4] = true;
celdas[4][5] = true;
celdas[3][5] = true;
celdas[2][5] = true;
*/

/*
//matusalenes Acorn
celdas[1][3] = true;
celdas[2][1] = true;
celdas[2][3] = true;
celdas[4][2] = true;
celdas[5][3] = true;
celdas[6][3] = true;
celdas[7][3] = true;
*/

//Matusalenes Diehard
//fin 160
celdas[1][2] = true;
celdas[2][2] = true;
celdas[2][3] = true;
celdas[7][1] = true;
celdas[6][3] = true;
celdas[7][3] = true;
celdas[8][3] = true;




const ctx = canvas.getContext('2d');
const automataCelular = new AutomataCelular(tamMatriz,ctx,celdas)
//const automataCelular = new AutomataCelular(tamMatriz,ctx)

automataCelular.crear();
automataCelular.pintar();
///tiempo ... 
setInterval(() => automataCelular.seguiente(),100);

