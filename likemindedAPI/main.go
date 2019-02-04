package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	getArtist("2h93pZq0e7k5yf4dywlkpM")
}

func getArtist(artistId string) {
	req, err := http.NewRequest("GET", "https://api.spotify.com/v1/artists/"+artistId, nil)
	//resp, err := http.Get("https://api.spotify.com/v1/artists/2h93pZq0e7k5yf4dywlkpM")
	req.Header.Add("Authorization", basicauth().Token_type+" "+basicauth().Access_token)
	client := &http.Client{}
	resp, err := client.Do(req)
	defer resp.Body.Close()
	if err != nil {
		log.Print(err)
		os.Exit(1)
	}
	var artist Artist
	_ = json.NewDecoder(resp.Body).Decode(&artist)
	fmt.Println(artist.Name)
}

func basicauth() Auth {
	url := "https://accounts.spotify.com/api/token?grant_type=client_credentials"
	req, err := http.NewRequest("POST", url, nil)
	req.SetBasicAuth("2c0c6feb1038450fbc9458745ada4266", "b06f0151f1c74df4b5afad2040b10eb5")
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	var auth Auth
	_ = json.NewDecoder(resp.Body).Decode(&auth)
	fmt.Println(auth)
	return auth
}
