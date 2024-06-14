import './App.css'
import BacktestingForm from './components/form-component'
import MonacoEditor from './components/monaco-editor'

function App() {


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Backtesting Form</h1>
      <BacktestingForm />
      <MonacoEditor></MonacoEditor>
    </div>
  )
}

export default App
