let almacen = null;

    const btnCargar = document.getElementById('btnCargar');
    const btnGenerar = document.getElementById('btnGenerar');
    const zonaTablas = document.getElementById('zona-tablas');
    const zonaTarjeta = document.getElementById('zona-tarjeta');
    const msjBox = document.getElementById('mensajes');

    // FUNCIÓN 1: CARGAR AMBAS APIS Y MOSTRAR TABLAS [cite: 50, 56, 122]
    btnCargar.addEventListener('click', async () => {
        zonaTablas.innerHTML = '';
        zonaTarjeta.innerHTML = '';
        msjBox.innerHTML = '';
        
        btnCargar.textContent = "Cargando..."; // [cite: 71]
        btnCargar.disabled = true;

        try {
            const id = Math.floor(Math.random() * 10) + 1;
            const paisesRef = ["Mexico", "Canada", "Japan", "Italy", "Spain"];
            const miPais = paisesRef[id % 5];

            // Peticiones [cite: 58]
            const [resU, resP] = await Promise.all([
                fetch(`https://jsonplaceholder.typicode.com/users/${id}`),
                fetch(`https://restcountries.com/v3.1/name/${miPais}?fullText=true`)
            ]);

            if (!resU.ok || !resP.ok) throw new Error("Fallo en la conexión");

            const user = await resU.json();
            const country = await resP.json();

            // Guardar datos [cite: 51, 123]
            almacen = {
                nombre: user.name,
                edad: 18 + id,
                pais: miPais,
                foto: `https://i.pravatar.cc/200?u=${id}`,
                bandera: country[0].flags.svg,
                capital: country[0].capital[0],
                region: country[0].region
            };

            // CREAR TABLA 1: USUARIO [cite: 27, 77]
            const tablaU = document.createElement('table');
            tablaU.innerHTML = `<tr><th colspan="2">API Usuario</th></tr>
                                <tr><td>Nombre</td><td>${almacen.nombre}</td></tr>
                                <tr><td>Edad</td><td>${almacen.edad}</td></tr>`;
            
            // CREAR TABLA 2: PAÍS [cite: 27, 77]
            const tablaP = document.createElement('table');
            tablaP.innerHTML = `<tr><th colspan="2">API País</th></tr>
                                <tr><td>Capital</td><td>${almacen.capital}</td></tr>
                                <tr><td>Región</td><td>${almacen.region}</td></tr>`;

            zonaTablas.appendChild(tablaU);
            zonaTablas.appendChild(tablaP);

        } catch (e) {
            const err = document.createElement('div');
            err.classList.add('error-msg');
            err.textContent = "ERROR: No se pudieron obtener los datos."; // [cite: 104, 130]
            msjBox.appendChild(err);
        } finally {
            btnCargar.textContent = "1. Cargar Tablas";
            btnCargar.disabled = false;
        }
    });

    // FUNCIÓN 2: TARJETA INTEGRADA [cite: 79, 124]
    btnGenerar.addEventListener('click', () => {
        zonaTarjeta.innerHTML = '';

        if (!almacen) {
            const err = document.createElement('div');
            err.classList.add('error-msg');
            err.textContent = "Error: Primero carga los datos de las tablas."; // [cite: 105, 131]
            msjBox.appendChild(err);
            return;
        }

        // Construcción dinámica [cite: 84]
        const card = document.createElement('div');
        card.classList.add('tarjeta-horizontal');

        const img = document.createElement('img');
        img.src = almacen.foto;
        img.classList.add('foto-perfil');

        const info = document.createElement('div');
        info.classList.add('info-final');

        const h2 = document.createElement('h2');
        h2.textContent = almacen.nombre;
        h2.style.color = "#000"; // Cambio de estilo dinámico [cite: 100]

        const p = document.createElement('p');
        p.innerHTML = `ID: ${almacen.edad}<br>Ubicación: ${almacen.capital}, ${almacen.pais}<br>Zona: ${almacen.region}`;

        const flag = document.createElement('img');
        flag.src = almacen.bandera;
        flag.classList.add('bandera-card');

        info.appendChild(h2);
        info.appendChild(p);
        info.appendChild(flag);
        card.appendChild(img);
        card.appendChild(info);
        
        zonaTarjeta.appendChild(card);
    });