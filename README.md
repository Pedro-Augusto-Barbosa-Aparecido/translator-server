# Translator Server

Para usar ele em sua máquina local:
 - `git clone https://github.com/Pedro-Augusto-Barbosa-Aparecido/translator-server.git`
 - `yarn install`
 - `yarn dev`
 - **urls:**
   - `/word/create/batch` cria varias **words** por requisição
   - `/word/create` cria uma **word**
   - `/word/get-contains` getList of **words** with filter by: 
     - word
     - limit    

Para usar online:
  - Instale o *`axios`* ou sua biblioteca de requisisões que preferir
  - **BASE URL**:
    - **`https://translator-server-refactoring.herokuapp.com/`**
  - **urls:**
     - `/word/create/batch` cria varias **words** por requisição
     - `/word/create` cria uma **word**
     - `/word/get-contains` getList of **words** with filter by: 
       - word
       - limit  