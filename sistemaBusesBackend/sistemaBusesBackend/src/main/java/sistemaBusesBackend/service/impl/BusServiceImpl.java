package sistemaBusesBackend.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import sistemaBusesBackend.dto.BusDTO;
import sistemaBusesBackend.entity.Bus;
import sistemaBusesBackend.mapper.BusMapper;
import sistemaBusesBackend.repository.BusRepository;
import sistemaBusesBackend.service.BusService;


@Service
public class BusServiceImpl implements BusService {

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private BusMapper busMapper;

    @Override
    public Page<Bus> listarBuses(Pageable pageable) {
        return busRepository.findAll(pageable);
    }

    public Page<BusDTO> listarBusesDTO(Pageable pageable) {
    	Page<Bus> buses = busRepository.findAllWithMarca(pageable);
    	return buses.map(busMapper:: toDto);
    }

    @Override
    public BusDTO obtenerBusPorId(Long id) {
        Bus bus = busRepository.findById(id)
        		.orElseThrow(() -> new EntityNotFoundException("Bus no encontrado con id" + id));
        return busMapper.toDto(bus);
    }
}
