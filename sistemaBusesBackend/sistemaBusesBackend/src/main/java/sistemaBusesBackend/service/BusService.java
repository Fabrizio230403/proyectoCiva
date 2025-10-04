package sistemaBusesBackend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sistemaBusesBackend.dto.BusDTO;
import sistemaBusesBackend.entity.Bus;


public interface BusService {
    Page<Bus> listarBuses(Pageable pageable);
    BusDTO obtenerBusPorId(Long id);
    Page<BusDTO> listarBusesDTO(Pageable pageable);
}
