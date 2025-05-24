# Average Calculator Microservice

This is a FastAPI-based microservice that calculates averages of different types of numbers (prime, Fibonacci, even, and random) while maintaining a sliding window of unique numbers.

## Features

- REST API endpoint for different number types
- Sliding window implementation with configurable size
- Automatic handling of timeouts and errors
- Unique number storage
- Average calculation
- Response time monitoring

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python main.py
```

The server will start on `http://localhost:9876`

## API Usage

The service exposes a single endpoint:

```
GET /numbers/{number_type}
```

Where `number_type` can be:
- `p` for prime numbers
- `f` for Fibonacci numbers
- `e` for even numbers
- `r` for random numbers

### Example Response

```json
{
  "windowPrevState": [2, 4, 6, 8],
  "windowCurrState": [12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
  "numbers": [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
  "avg": 23.40
}
```

## Configuration

The following parameters can be modified in `main.py`:
- `WINDOW_SIZE`: Size of the sliding window (default: 10)
- `TIMEOUT`: Maximum response time in seconds (default: 0.5)
- `BASE_URL`: Base URL for the number generation service 