const number_pokemon = document.querySelector("#numberpokemon")
const name_pokemon = document.querySelector("#namepokemon")
let imgpokemon = document.querySelector("#pokemon1")

const input = document.querySelector(".input")
const form = document.querySelector(".form")

const Buttonavant = document.querySelector("#avanca_button")
const Buttonrecua = document.querySelector("#recua_button")

let positin = 1

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )

  if (APIResponse.status === 200) {
    const data = await APIResponse.json()
    return data
  }
}

const renderPokemon = async (pokemon) => {
  const data = await fetchPokemon(pokemon)

  namepokemon.innerHTML = "Loading..."
  numberpokemon.innerHTML = ""
  if (data) {
    positin = data.id
    imgpokemon.style.display = "block"
    namepokemon.innerHTML = data.name
    numberpokemon.innerHTML = `${data.id} - `
    imgpokemon.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ]
    input.value = ""
  } else {
    imgpokemon.style.display = "none"
    namepokemon.innerHTML = "Not found :c"
    numberpokemon.innerHTML = ""
    input.value = ""
    positin = 0
  }
}

form.addEventListener("submit", (ev) => {
  ev.preventDefault()

  renderPokemon(input.value.toLowerCase())
})

Buttonavant.addEventListener("click", () => {
  positin++
  renderPokemon(positin)
})

Buttonrecua.addEventListener("click", () => {
  if (positin > 1) {
    positin--
    renderPokemon(positin)
  }
})
