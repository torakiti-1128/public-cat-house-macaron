package notification

type TextMessage struct {
	Type string `json:"type"`
	Text string `json:"text"`
}

type LineMessage struct {
	To       string        `json:"to"`
	Messages []TextMessage `json:"messages"`
}
