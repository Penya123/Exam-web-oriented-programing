let btnCargar = document.getElementById("btnCargar");
        let card = document.getElementById("user-card");

        btnCargar.addEventListener("click", () => {
            let mensajeCarga = document.createElement('p')
            mensajeCarga.textContent = "Cargando..."
            card.appendChild(mensajeCarga)
            cardarUsuario
        });

        async function  cardarUsuario() {
            const url = 'https://jsonplaceholder.typicode.com/users/'
            try {
                const respuesta = await fetch(url)
                const datos = await respuesta.json;
                const user = datos.results[0];

                mostrarUsuario(user);
            } catch (error) {
                document.getElementById('usuario-card').innerHTML = `<p>Error al cargar datos</p>`;
            }
        }

        function mostrarUsuario(user){

        }