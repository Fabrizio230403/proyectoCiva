package sistemaBusesBackend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bus")
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El número de bus no puede estar vacío")
    @Column(name = "numero_bus", nullable = false, unique = true, length = 20)
    private String numeroBus;

    @NotBlank(message = "La placa no puede estar vacía")
    @Pattern(regexp = "^[A-Z0-9-]+$", message = "La placa solo puede contener letras mayúsculas, números y guiones")
    @Size(min = 5, max = 10, message = "La placa debe tener entre 5 y 10 caracteres")
    @Column(nullable = false, unique = true, length = 10)
    private String placa;

    @CreationTimestamp
    @Column(name="fecha_creacion", nullable = false, updatable = false)
    private Date fechaCreacion;

    @Size(max=255, message = "Las características no pueden superar los 255 caracteres")
    @Column(length = 255)
    private String caracteristicas;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "marca_id", nullable = false)
    private MarcaBus marca;

    @NotNull(message = "El estado (activo/inactivo) es obligatorio")
    @Column(nullable = false)
    private String estado;
}
