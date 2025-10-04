package sistemaBusesBackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sistemaBusesBackend.dto.BusDTO;
import sistemaBusesBackend.dto.BusPageResponseDTO;
import sistemaBusesBackend.service.BusService;

@RestController
@RequestMapping("/bus")
public class BusController {

    @Autowired
    private BusService busService;

    @GetMapping
    public ResponseEntity<BusPageResponseDTO> listarBuses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<BusDTO> busesPage = busService.listarBusesDTO(pageable);

        BusPageResponseDTO response = new BusPageResponseDTO();
        response.setContent(busesPage.getContent());
        response.setPage(busesPage.getNumber());
        response.setSize(busesPage.getSize());
        response.setTotalElements(busesPage.getTotalElements());
        response.setTotalPages(busesPage.getTotalPages());
        response.setLast(busesPage.isLast());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusDTO> obtenerBusPorId(@PathVariable Long id)  {
        BusDTO busDTO = busService.obtenerBusPorId(id);
        return ResponseEntity.ok(busDTO);
    }
}
