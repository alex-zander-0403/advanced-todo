import { useEffect, useRef, useState } from "react";
import { DeadlineBlock } from "./DeadlineBlock";
import { PlusIcon } from "./icons/PlusIcon";
import MicrophoneIcon from "../assets/mic.png";

//
function AddTodo({ onAdd }) {
  const [value, setValue] = useState("");
  const [deadline, setDeadline] = useState("");
  const [showDeadlineInput, setShowDeadlineInput] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const finalTextRef = useRef("");

  //
  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    //
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webKit.SpeechRecognition;

      if (SpeechRecognition) {
        const recognitionInstanse = new SpeechRecognition();
        recognitionInstanse.continuous = true;
        recognitionInstanse.lang = "ru-RU";
        recognitionInstanse.interimResults = true;

        recognitionInstanse.onresult = (event) => {
          let finalTranscript = "";
          let temporaryTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              temporaryTranscript += transcript;
            }
            // console.log("временный -->", temporaryTranscript);
            // console.log("финальный -->", finalTranscript);

            if (finalTranscript) {
              finalTextRef.current =
                finalTextRef.current + " " + finalTranscript;
              setValue(finalTextRef.current);
            } else if (temporaryTranscript) {
              setValue(finalTextRef.current + " " + temporaryTranscript);
            }
          }
        };

        recognitionInstanse.oneerror = (event) => {
          console.error("Ошибка распознавания ->", event.error);
          stopListening();
        };

        recognitionInstanse.oneend = () => {
          if (isListening) {
            recognitionInstanse.start();
          }
        };

        setRecognition(recognitionInstanse);
      }
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening]);

  //
  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim() !== "") {
      onAdd(value, deadline);
      setValue("");
      setDeadline("");
      setShowDeadlineInput(false);

      finalTextRef.current = "";
      stopListening();
    } else {
      alert("Введите текст");
    }
  }

  //
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between focus-within:ring-2 focus-within:ring-blue-800 rounded-lg shadow-sm overflow-hidden">
        <input
          type="text"
          value={value}
          placeholder="введите новую задачу"
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 p-3 outline-none text-gray-700 dark:text-txt-dark dark:bg-page-dark placeholder-gray-400"
        />

        <button
          type="button"
          onClick={toggleListening}
          title={isListening ? "Остановить запись" : "Начать запись"}
          className={`cursor-pointer p-3 transition-colors duration-250 ${isListening ? "bg-red-400 rounded" : ""}`}
        >
          <img
            src={MicrophoneIcon}
            alt="голосовой ввод"
            className={isListening ? "filter brightness-0 invert" : ""}
          />
        </button>

        <button
          type="submit"
          className="p-3 cursor-pointer transition-colors duration-300 bg-blue-300 hover:bg-blue-200 text-white dark:bg-blue-900 dark:hover:bg-blue-800"
        >
          <PlusIcon />
        </button>
      </div>

      {isListening ? (
        <div className="-3 transition-colors duration-300 text-violet-800 dark:text-violet-500">
          <span>Идет запись...</span>
        </div>
      ) : (
        <DeadlineBlock
          showDeadlineInput={showDeadlineInput}
          setShowDeadlineInput={setShowDeadlineInput}
          deadline={deadline}
          setDeadline={setDeadline}
        />
      )}
    </form>
  );
}

export default AddTodo;
