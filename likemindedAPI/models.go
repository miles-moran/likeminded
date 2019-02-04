package main

type Auth struct {
	Access_token string `json:"access_token,omitempty"`
	Token_type   string `json:"token_type,omitempty"`
	Expires_in   int    `json:"expires_in,omitempty"`
	Scope        string `json:"scope,omitempty"`
}

type Artist struct {
	Name string `json:"name"`
}
