package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		render(w, "test.page.gohtml")
	})

	fmt.Println("Starting front end service on port 80")
	err := http.ListenAndServe(":80", nil)
	if err != nil {
		log.Panic(err)
	}
}

func render(w http.ResponseWriter, t string) {
	pwd, _ := os.Getwd()
	partials := []string{
		filepath.Join(pwd, "templates", "base.layout.gohtml"),
		filepath.Join(pwd, "templates", "header.partial.gohtml"),
		filepath.Join(pwd, "templates", "footer.partial.gohtml"),
	}

	var templateSlice []string
	templateSlice = append(templateSlice, filepath.Join(pwd, "templates", t))

	templateSlice = append(templateSlice, partials...)

	tmpl, err := template.ParseFiles(templateSlice...)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tmpl.Execute(w, nil); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
