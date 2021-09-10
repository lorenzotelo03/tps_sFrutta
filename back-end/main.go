package main

import (
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

//given a string will return the first image found on unsplash by querying that image
func getPictureUrl(thing string) (string, error) {
	response, err := http.Get("https://unsplash.com/s/photos/" + thing)
	if err != nil {
		return "", err
	}
	defer response.Body.Close()

	dataInBytes, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return "", err
	}
	pageContent := string(dataInBytes)

	figureStartIndex := strings.Index(pageContent, "<figure")
	if figureStartIndex == -1 {
		return "", errors.New("No figure found")
	}
	figureEndIndex := strings.Index(pageContent, "</figure>")

	pageFigure := pageContent[figureStartIndex:figureEndIndex]

	srcStartIndex := strings.Index(pageFigure, "src=\"") + 5
	srcEndIndex := strings.Index(pageFigure, "thumbnailUrl") - 12

	url := pageFigure[srcStartIndex:srcEndIndex]
	return url, nil
}

func HomePageHandler(w http.ResponseWriter, r *http.Request) {
	url, err := getPictureUrl(mux.Vars(r)["id"])
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Sprintf(`{"code": 400, "msg": "%s"}`, err.Error())))
		return

	}
	w.Write([]byte(fmt.Sprintf(`{"code": 200, "url": "%s"}`, url)))
}

func GetFruitJson(thing string) ([]byte, error) {
	response, err := http.Get("https://fruityvice.com/api/fruit/" + thing)
	if err != nil {
		return []byte(""), err
	}
	defer response.Body.Close()

	dataInBytes, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return []byte(""), err
	}

	return dataInBytes, nil
}

func FruitHandler(w http.ResponseWriter, r *http.Request) {
	json, err := GetFruitJson(mux.Vars(r)["id"])
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Sprintf(`{"code": 400, "msg": "%s"}`, err.Error())))
		return

	}
	w.Write(json)
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r := mux.NewRouter()

	r.HandleFunc("/img/{id}", HomePageHandler).Methods("GET", "OPTIONS")
	r.HandleFunc("/fruit/{id}", FruitHandler).Methods("GET", "OPTIONS")

	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With"})
	methodsOk := handlers.AllowedMethods([]string{"GET"})
	originsOk := handlers.AllowedOrigins([]string{"*"})

	log.Println("starting on", ":"+port)
	log.Fatal(http.ListenAndServe(":"+port, handlers.CORS(originsOk, headersOk, methodsOk)(r)))
}
