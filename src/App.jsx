import { useEffect, useState } from 'react'
import './App.css'

import { db } from '../config/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'

function App() {
  // const guessColor = new brain.NeuralNetwork({hiddenLayers: [1]}); // 16.5 segundos
  const guessColor = new brain.NeuralNetwork({ hiddenLayers: [3] }); // 20, 21
  // const guessColor = new brain.NeuralNetwork({hiddenLayers: [2]}); // 19 segundos
  const [random, setRandom] = useState([]);
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState('#000000');

  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);

  const colorsCollectionRef = collection(db, "colors")

  useEffect(() => {
    getRandomColor()
    getAllColors();
  }, [])

  const getAllColors = async () => {
    const data = await getDocs(colorsCollectionRef)
    data.docs.forEach(doc => setColors(current => [...current, { ...doc.data() }]))
  }

  const findColor = () => {
    guessColor.train(colors, {
      iterations: 2500
    })
    console.log({ colors });

    // guessColor.trainAsync(colors, {
    //   iterations: 2500
    // })
    //   .then(res => {
    //     console.log(res);
    //     let r = parseInt(color.substr(1, 2), 16)
    //     let g = parseInt(color.substr(3, 2), 16)
    //     let b = parseInt(color.substr(5, 2), 16)
    //     console.log(r, g, b);
    //     let salida = guessColor.run([r / 255, g / 255, b / 255])
    //     let array = Object.entries(salida);
    //     array.sort((a, b) => b[1] - a[1])
    //     document.querySelector(".result").textContent = array[0][0]
    //     console.log(array);
    //   })
    //   .catch(err => console.log(err))


    let r = parseInt(color.substr(1, 2), 16)
    let g = parseInt(color.substr(3, 2), 16)
    let b = parseInt(color.substr(5, 2), 16)
    console.log(r, g, b);
    let salida = guessColor.run([r / 255, g / 255, b / 255])
    let array = Object.entries(salida);
    array.sort((a, b) => b[1] - a[1])
    document.querySelector(".result").textContent = array[0][0]
    console.log(array);
  }

  const train = async () => {
    let color = document.querySelector('.colorName').value.toLowerCase().trim()
    console.log(color);
    let data = { input: random, output: { [color]: 1 } }
    console.log(data);
    await addDoc(colorsCollectionRef, data)
    console.log(colors);
    getRandomColor();
  }
  const reverseColor = () => {
    console.log({ r: r * 255, g: g * 255, b: b * 255 })
  }
  const getRandomColor = () => {
    let r = parseInt((Math.random() * 255).toFixed(0))
    let g = parseInt((Math.random() * 255).toFixed(0))
    let b = parseInt((Math.random() * 255).toFixed(0))

    setRandom([r / 255, g / 255, b / 255])
  }

  return (
    <main>
      <div>
        <label htmlFor="color">Seleccionar color</label>
        <input type="color" className="selectedColor" id="color" onChange={(e) => setColor(e.target.value)} />
        <p className="result"></p>
        <button className="findColor" onClick={findColor}>Averiguar color</button>
      </div>
      <div>
        <span className="randomColor" style={{
          backgroundColor: `rgb(${random[0] * 255}, ${random[1] * 255}, ${random[2] * 255})`
        }}></span>
        <input type="text" className="colorName" placeholder="Nombre del color" required />
        <button className="train" onClick={train}>Entrenar</button>
      </div>
      {/* <div>
        <input type="text" onChange={(e) => setR(e.target.value * 255)} placeholder='Red' />
        <input type="text" onChange={(e) => setG(e.target.value * 255)} placeholder='Green' />
        <input type="text" onChange={(e) => setB(e.target.value * 255)} placeholder='Blue' />
        <button onClick={reverseColor}>Reverse</button>
        <div style={{
          backgroundColor: `rgb(${r},${g},${b})`
        }}>color</div>
      </div> */}
    </main>
  )
}

export default App
