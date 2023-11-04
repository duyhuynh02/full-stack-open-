import ReactDOM from "react-dom/client";
import App from "./App";
import reducer from './app/store'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(reducer)
// console.log(store.getState())

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)

