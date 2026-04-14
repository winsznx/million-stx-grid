(define-constant GRID-SIZE u100)
;; Maximum grid dimension for coordinate validation
(define-constant ERR-OUT-OF-BOUNDS (err u100))
(define-constant ERR-INVALID-COLOR (err u101))

(define-map pixel-colors
  { x: uint, y: uint }
  { color: (string-ascii 7), painter: principal }
)

(define-data-var total-pixels-painted uint u0)

(define-map painter-pixel-count principal uint)

(define-private (is-valid-coordinate (x uint) (y uint))
  (and (< x GRID-SIZE) (< y GRID-SIZE))
)

(define-private (is-valid-hex-color (color (string-ascii 7)))
  (is-eq (len color) u7)
)

(define-public (paint-pixel (x uint) (y uint) (color (string-ascii 7)))
  (begin
    (asserts! (is-valid-coordinate x y) ERR-OUT-OF-BOUNDS)
    (asserts! (is-valid-hex-color color) ERR-INVALID-COLOR)
    (map-set pixel-colors
      { x: x, y: y }
      { color: color, painter: tx-sender }
    )
        (var-set total-pixels-painted (+ (var-get total-pixels-painted) u1))
    (map-set painter-pixel-count tx-sender (+ (default-to u0 (map-get? painter-pixel-count tx-sender)) u1))
    (print { event: "pixel-painted", x: x, y: y, color: color, painter: tx-sender })
    (ok true)
  )
)

(define-read-only (get-pixel (x uint) (y uint))
  (map-get? pixel-colors { x: x, y: y })
)

(define-read-only (get-total-painted)
  (ok (var-get total-pixels-painted))
)

(define-read-only (get-painter-count (painter principal))
  (ok (default-to u0 (map-get? painter-pixel-count painter)))
)
